# server/utils/llm_parser.py

import os
import json
import re
from dotenv import load_dotenv
import httpx
from datetime import datetime

load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

async def get_parsed_expense(transcript: str):
    today_date = datetime.now().strftime("%Y-%m-%d")
    today_year = datetime.now().year

    prompt = f"""
Today is {today_date} (Year: {today_year}).
You are a smart expense extraction assistant.

Your task is to extract the following fields from the user’s sentence:
- amount (₹ or Rs)
- category (shopping, food, rent, etc.)
- mode (Cash, PhonePe, GPay, Card, etc.)
- date (replace words like today/yesterday with real date in YYYY-MM-DD format)
- split_with (list of names if mentioned, else null)

Examples:
1. "I paid 900 for dinner with Rahul and Sneha via GPay"
2. "Yesterday I spent 1200 on rent"
3. "Split ₹800 for lunch with Riya and me using PhonePe"

Only return JSON. Do not add explanation or markdown.

Return JSON like:
{{
  "amount": 900,
  "category": "dinner",
  "mode": "GPay",
  "date": "2025-07-01",
  "split_with": ["Rahul", "Sneha"]
}}

Now extract from:
\"{transcript}\"
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "meta-llama/llama-3.1-8b-instruct",
        "messages": [{"role": "user", "content": prompt}]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload
        )

    data = response.json()
    print("🧠 LLM Raw Response:", data)

    if "choices" not in data:
        return {"error": "'choices' not found", "raw": data}
    if response.status_code != 200:
        return {"error": "LLM request failed", "status": response.status_code}


    reply = data["choices"][0]["message"]["content"]
    match = re.search(r"\{.*\}", reply, re.DOTALL)

    if match:
        try:
            return {"parsed": json.loads(match.group(0))}
        except Exception as e:
            return {"error": "JSON parse error", "raw": reply, "exception": str(e)}
    else:
        return {"error": "No valid JSON found", "raw": reply}
