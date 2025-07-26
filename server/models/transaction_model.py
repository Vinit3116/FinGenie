# server/models/transaction_model.py

from pydantic import BaseModel
from typing import Optional, List

class Transaction(BaseModel):
    amount: float
    category: str
    mode: str
    date: Optional[str] = None
    split_with: Optional[List[str]] = []