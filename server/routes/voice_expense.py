# server/routes/voice_expense.py

from fastapi import APIRouter, HTTPException, Request
from typing import Dict, Any

from server.models.transaction_model import Transaction
from server.models.transcript_model import TranscriptInput
from server.utils.llm_parser import get_parsed_expense

router = APIRouter()


@router.post("/voice-expense", response_model=Dict[str, Any])
async def parse_voice_expense(request: Request):
    """
    Parse voice transcript into structured expense data using LLM.
    
    Args:
        request (Request): HTTP request containing transcript
        
    Returns:
        Dict[str, Any]: Parsed expense data or error information
    """
    try:
        # Extract and validate transcript
        data = await request.json()
        transcript = data.get("transcript")
        
        if not transcript or not transcript.strip():
            raise HTTPException(status_code=400, detail="Transcript is required and cannot be empty")

        # Parse transcript using LLM
        parsed_result = await get_parsed_expense(transcript)
        print("🧠 LLM Response:", parsed_result)

        # Check for parsing errors
        if "error" in parsed_result:
            return {
                "error": "Failed to parse transcript",
                "details": parsed_result["error"],
                "raw": parsed_result.get("raw", "")
            }

        # Extract parsed data
        parsed_data = parsed_result.get("parsed", {})
        if not parsed_data:
            return {
                "error": "No parsed data received from LLM",
                "raw": parsed_result
            }

        # Validate against Transaction schema
        try:
            expense = Transaction(**parsed_data)
            return {
                "message": "Parsed successfully",
                "parsed": expense.dict()
            }
        except Exception as validation_error:
            return {
                "error": "Invalid transaction data",
                "details": str(validation_error),
                "raw": parsed_data
            }

    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        print(f"❌ Unexpected error in voice expense parsing: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Voice parsing failed: {str(e)}")
