# server/routes/transactions.py

from fastapi import APIRouter, HTTPException
from typing import List
from pymongo.errors import PyMongoError

from config.db import transactions_collection
from server.models.transaction_model import Transaction

router = APIRouter()


@router.post("/transactions", response_model=dict)
async def create_transaction(transaction: Transaction):
    """
    Create a new transaction.
    
    Args:
        transaction (Transaction): Transaction data to save
        
    Returns:
        dict: Success message with transaction ID
    """
    try:
        result = await transactions_collection.insert_one(transaction.dict())
        return {
            "message": "Transaction saved successfully",
            "id": str(result.inserted_id)
        }
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save transaction: {str(e)}")


@router.get("/transactions", response_model=List[Transaction])
async def get_transactions():
    """
    Get all transactions.
    
    Returns:
        List[Transaction]: List of all transactions
    """
    try:
        docs = transactions_collection.find()
        transactions = [Transaction(**doc) async for doc in docs]
        return transactions
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch transactions: {str(e)}")
