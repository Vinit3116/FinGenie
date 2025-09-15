# server/utils/llm_parser.py

import os
import json
import re
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
import httpx
import dateparser
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
LLM_MODEL = "meta-llama/llama-3.1-8b-instruct"

# Valid payment methods for validation
VALID_PAYMENT_METHODS = ["Cash", "UPI", "GPay", "PhonePe", "Card", "NetBanking", "Wallet"]


async def get_parsed_expense(transcript: str) -> Dict[str, Any]:
    """
    Parse expense details from voice transcript using LLM.
    
    Args:
        transcript (str): Voice-to-text transcript to parse
        
    Returns:
        Dict[str, Any]: Parsed expense data or error information
    """
    try:
        # Get current date context
        today_date = datetime.now().strftime("%Y-%m-%d")
        yesterday_date = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
        
        # Generate LLM prompt
        prompt = _generate_llm_prompt(transcript, today_date, yesterday_date)
        
        # Call LLM API
        llm_response = await _call_llm_api(prompt)
        if "error" in llm_response:
            return llm_response
            
        # Extract and parse JSON from LLM response
        parsed_data = _extract_json_from_response(llm_response["content"])
        if "error" in parsed_data:
            return parsed_data
            
        # Process and validate the parsed data
        processed_data = _process_parsed_data(parsed_data, today_date)
        
        return {"parsed": processed_data}
        
    except Exception as e:
        print(f"❌ Unexpected error in get_parsed_expense: {str(e)}")
        return {"error": "Unexpected parsing error", "exception": str(e)}


def _generate_llm_prompt(transcript: str, today_date: str, yesterday_date: str) -> str:
    """Generate the LLM prompt for expense extraction."""
    return f"""
Today is {today_date}.

You are an expense extraction assistant. 
Return ONLY valid JSON with the following keys:

- description: short human-friendly text ("Dinner with Rahul", "Monthly Rent")
- amount: number only
- category: general category ("food", "rent", "groceries", "shopping", "travel", etc.)
- payment_method: one of {VALID_PAYMENT_METHODS}
- date: strict format YYYY-MM-DD (resolve 'yesterday', 'today', 'tomorrow', weekdays, explicit dates, etc.)
- split_with: array of names if mentioned, else []

Examples:

Input: "I paid 900 for dinner with Rahul via GPay"
Output:
{{
  "description": "Dinner with Rahul",
  "amount": 900,
  "category": "food",
  "payment_method": "GPay",
  "date": "{today_date}",
  "split_with": ["Rahul"]
}}

Input: "Yesterday I spent 1200 on rent in cash"
Output:
{{
  "description": "Monthly Rent",
  "amount": 1200,
  "category": "rent",
  "payment_method": "Cash",
  "date": "{yesterday_date}",
  "split_with": []
}}

Now extract from:
"{transcript}"
"""


async def _call_llm_api(prompt: str) -> Dict[str, Any]:
    """Call the OpenRouter LLM API."""
    if not OPENROUTER_API_KEY:
        return {"error": "OpenRouter API key not configured"}
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": LLM_MODEL,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant that extracts expenses into JSON."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(OPENROUTER_API_URL, headers=headers, json=payload)
            
        if response.status_code != 200:
            return {"error": "LLM request failed", "status": response.status_code}
            
        data = response.json()
        print("🧠 LLM Raw Response:", data)
        
        if "choices" not in data or not data["choices"]:
            return {"error": "Invalid LLM response format", "raw": data}
            
        return {"content": data["choices"][0]["message"]["content"]}
        
    except httpx.RequestError as e:
        return {"error": f"Network error: {str(e)}"}
    except Exception as e:
        return {"error": f"API call failed: {str(e)}"}


def _extract_json_from_response(content: str) -> Dict[str, Any]:
    """Extract and parse JSON from LLM response."""
    # Find JSON block in the response
    match = re.search(r"\{.*\}", content, re.DOTALL)
    
    if not match:
        return {"error": "No valid JSON found", "raw": content}
    
    try:
        return json.loads(match.group(0))
    except json.JSONDecodeError as e:
        return {"error": "JSON parse error", "raw": content, "exception": str(e)}


def _process_parsed_data(parsed_data: Dict[str, Any], today_date: str) -> Dict[str, Any]:
    """Process and validate parsed data from LLM."""
    # Parse date with fallback logic
    final_date = _parse_date(parsed_data.get("date", today_date))
    
    # Validate and normalize payment method
    payment_method = _normalize_payment_method(parsed_data.get("payment_method", ""))
    
    # Build final processed data
    return {
        "description": parsed_data.get("description", ""),
        "amount": parsed_data.get("amount", 0),
        "category": parsed_data.get("category", ""),
        "mode": payment_method,
        "date": final_date,
        "split_with": parsed_data.get("split_with", []),
    }


def _parse_date(raw_date: str) -> str:
    """Parse date with multiple fallback strategies."""
    today_date = datetime.now().strftime("%Y-%m-%d")
    
    print(f"🔍 Raw date from LLM: '{raw_date}'")
    
    # First check for relative date patterns
    raw_date_lower = str(raw_date).lower().strip()
    
    if "yesterday" in raw_date_lower:
        final_date = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
        print(f"✅ Manual yesterday parsing: {final_date}")
        return final_date
    elif "today" in raw_date_lower:
        print(f"✅ Manual today parsing: {today_date}")
        return today_date
    elif "tomorrow" in raw_date_lower:
        final_date = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        print(f"✅ Manual tomorrow parsing: {final_date}")
        return final_date
    
    # Try dateparser for other formats
    parsed_date = dateparser.parse(str(raw_date))
    if parsed_date:
        final_date = parsed_date.strftime("%Y-%m-%d")
        print(f"✅ Dateparser result: {final_date}")
        return final_date
    
    # Try direct YYYY-MM-DD format
    try:
        datetime.strptime(str(raw_date), "%Y-%m-%d")
        print(f"✅ Direct date format: {raw_date}")
        return str(raw_date)
    except ValueError:
        print(f"⚠️ Fallback to today: {today_date}")
        return today_date


def _normalize_payment_method(payment_method: str) -> str:
    """Normalize payment method to valid options."""
    if payment_method in VALID_PAYMENT_METHODS:
        return payment_method
    return "Other"