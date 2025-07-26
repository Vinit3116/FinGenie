# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routes.transactions import router as transactions_router  
from server.routes import voice_expense

app = FastAPI(
    title="FinGenie 🧠💰",
    description="AI-powered voice finance tracker",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers

app.include_router(transactions_router)
app.include_router(voice_expense.router)