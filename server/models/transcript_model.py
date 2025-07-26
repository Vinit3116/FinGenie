# server/models/transcript_model.py

from pydantic import BaseModel

class TranscriptInput(BaseModel):
    transcript: str
