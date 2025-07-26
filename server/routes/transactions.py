# server/routes/transactions.py

from fastapi import APIRouter, HTTPException
from config.db import transactions_collection
from server.models.transaction_model import Transaction
from typing import List

router = APIRouter()

@router.post("/save-expense")
async def save_expense(transaction: Transaction):
    try:
        result = await transactions_collection.insert_one(transaction.dict())
        return {"message": "Expense saved successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save expense: {str(e)}")


@router.get("/transactions", response_model=List[Transaction])
async def get_transactions():
    try:
        docs = transactions_collection.find()
        transactions = [Transaction(**doc) async for doc in docs]
        return transactions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch transactions: {str(e)}")
