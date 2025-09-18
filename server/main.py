# server/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.routes.transactions import router as transactions_router
from server.routes.voice_expense import router as voice_expense_router

# Create FastAPI application
app = FastAPI(
    title="FinGenie 🧠💰",
    description="AI-powered voice finance tracker for expense management",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(transactions_router, prefix="/api", tags=["transactions"])
app.include_router(voice_expense_router, prefix="/api", tags=["voice"])


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "FinGenie API is running!",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "FinGenie API"}