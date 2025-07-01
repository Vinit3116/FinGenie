from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import httpx
import json
import re
from datetime import datetime

# Load .env file variables
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model expected from frontend
class TranscriptInput(BaseModel):
    transcript: str

@app.post("/parse-expense")
async def parse_expense(data: TranscriptInput):
    # Get today's date dynamically
    today_date = datetime.now().strftime("%Y-%m-%d")
    today_year = datetime.now().year

    # 💡 Updated Prompt for LLM to support SPLIT logic too
    prompt = f"""
Today is {today_date} (Year: {today_year}).
You are a smart expense extraction assistant.

Your task is to extract the following fields from the user’s sentence:
- amount (₹ or Rs)
- category (shopping, food, rent, etc.)
- mode (Cash, PhonePe, GPay, Card, etc.)
- date (replace words like today/yesterday with real date in YYYY-MM-DD format)
- split_with (list of names if mentioned, else null)

Examples of user input:
1. "I paid 900 for dinner with Rahul and Sneha via GPay"
2. "Yesterday I spent 1200 on rent"
3. "Split ₹800 for lunch with Riya and me using PhonePe"

Always return in this JSON format:
{{
  "amount": 900,
  "category": "dinner",
  "mode": "GPay",
  "date": "2025-07-01",
  "split_with": ["Rahul", "Sneha"]
}}

If no people are mentioned for split, return `"split_with": null`

Now extract from:
"{data.transcript}"
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "meta-llama/llama-3.1-8b-instruct:free",  # ✅ Free OpenRouter model
        "messages": [{"role": "user", "content": prompt}]
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json=payload
            )

        data = response.json()
        print("🧠 LLM Raw Response:", data)

        if "choices" not in data:
            return {"error": "'choices' not found in response", "raw": data}

        reply = data["choices"][0]["message"]["content"]

        # Extract JSON from LLM response using regex
        json_match = re.search(r"\{.*\}", reply, re.DOTALL)
        if json_match:
            json_str = json_match.group(0)
            parsed_json = json.loads(json_str)
            return {"parsed": parsed_json}
        else:
            return {"error": "No valid JSON found", "raw": reply}

    except Exception as e:
        return {"error": str(e)}
