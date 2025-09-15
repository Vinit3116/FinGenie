# server/models/transcript_model.py

from pydantic import BaseModel, Field

class TranscriptInput(BaseModel):
    """
    Input model for voice transcript processing.
    
    Used for receiving and validating voice-to-text transcriptions
    before sending them to the LLM parser.
    """
    transcript: str = Field(..., min_length=1, description="Voice transcript text to be parsed")
