# server/models/transaction_model.py

from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime

class Transaction(BaseModel):
    """
    Transaction model for expense tracking.
    
    Represents a financial transaction with all necessary details
    for expense management and categorization.
    """
    amount: float = Field(..., gt=0, description="Transaction amount (must be positive)")
    category: str = Field(..., min_length=1, description="Expense category (e.g., food, rent, groceries)")
    mode: Optional[str] = Field(None, description="Payment method (e.g., UPI, Cash, Card)")
    date: Optional[str] = Field(None, description="Transaction date in YYYY-MM-DD format")
    split_with: Optional[List[str]] = Field(default_factory=list, description="Names of people to split expense with")
    description: Optional[str] = Field(None, description="Human-readable transaction description")
    
    @validator('date')
    def validate_date_format(cls, v):
        """Validate date format is YYYY-MM-DD"""
        if v is not None:
            try:
                datetime.strptime(v, '%Y-%m-%d')
            except ValueError:
                raise ValueError('Date must be in YYYY-MM-DD format')
        return v
    
    @validator('amount')
    def validate_amount(cls, v):
        """Ensure amount is positive"""
        if v <= 0:
            raise ValueError('Amount must be greater than 0')
        return v
    
    class Config:
        """Pydantic configuration"""
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
