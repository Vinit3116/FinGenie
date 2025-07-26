# server/routes/parse_transcript.py

from fastapi import APIRouter, HTTPException, Request
from utils.llm_parser import get_parsed_expense

router = APIRouter()

@router.post("/parse")
async def parse_transcript(request: Request):
    try:
        data = await request.json()
        transcript = data.get("transcript")
        if not transcript:
            raise HTTPException(status_code=400, detail="Transcript is required")

        parsed_expense = await get_parsed_expense(transcript)
        return {"parsed_expense": parsed_expense}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Parsing failed: {str(e)}")