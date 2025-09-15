# config/db.py

import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "fingenie")

# Validate configuration
if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable is required")

# Create MongoDB client and database connection
client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB_NAME]

# Collections
transactions_collection = db["transactions"]


def get_database():
    """
    Get database instance.
    
    Returns:
        AsyncIOMotorDatabase: MongoDB database instance
    """
    return db


def get_transactions_collection():
    """
    Get transactions collection.
    
    Returns:
        AsyncIOMotorCollection: Transactions collection
    """
    return transactions_collection