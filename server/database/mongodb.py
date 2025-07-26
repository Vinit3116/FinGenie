# server/database/mongodb.py

import os
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv

# ✅ Load .env explicitly and reliably
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", "..", ".env"))

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

print("✅ MONGO_URI:", MONGO_URI)
print("✅ MONGO_DB_NAME:", MONGO_DB_NAME)

assert MONGO_URI is not None, "MONGO_URI not loaded!"
assert MONGO_DB_NAME is not None, "MONGO_DB_NAME not loaded!"

client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]

def get_database():
    return db
