# server/routes/voice_expense.py

from fastapi import APIRouter, HTTPException, Request
from config.db import transactions_collection
from server.models.transaction_model import Transaction
from server.utils.llm_parser import get_parsed_expense

router = APIRouter()

@router.post("/voice-expense")
async def voice_expense(request: Request):
    try:
        data = await request.json()
        transcript = data.get("transcript")

        if not transcript:
            raise HTTPException(status_code=400, detail="Transcript is required")

        parsed_data = await get_parsed_expense(transcript)

        # If response is a JSON string, parse it:
        if isinstance(parsed_data, str):
            import json
            parsed_data = json.loads(parsed_data)

        # If response is nested under 'parsed' key, extract it:
        if "parsed" in parsed_data:
            parsed_data = parsed_data["parsed"]

        expense = Transaction(**parsed_data)

        result = await transactions_collection.insert_one(expense.dict())
        return {"message": "Expense saved successfully", "id": str(result.inserted_id)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Voice expense processing failed: {str(e)}")