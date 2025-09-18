# server/main.py

import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from server.routes.transactions import router as transactions_router
from server.routes.voice_expense import router as voice_expense_router

# FastAPI app
app = FastAPI(
    title="FinGenie 🧠💰",
    description="AI-powered voice finance tracker for expense management",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS origins from env var (comma-separated) or default to local dev
_allowed = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
ALLOWED_ORIGINS = [o.strip() for o in _allowed.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes (keep API functionality unchanged)
app.include_router(transactions_router, prefix="/api", tags=["transactions"])
app.include_router(voice_expense_router, prefix="/api", tags=["voice"])

# Health endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "FinGenie API"}

# If frontend is built (client/dist), serve it as a SPA (index.html fallback)
HERE = Path(__file__).resolve().parent
FRONTEND_DIST = (HERE.parent / "client" / "dist").resolve()

if FRONTEND_DIST.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIST), html=True), name="frontend")
    print(f"✅ Mounted frontend from: {FRONTEND_DIST}")
else:
    print("ℹ️ Frontend build not found at client/dist. Build the client before deploying (npm run build).")

# Optional root informational endpoint (useful when frontend isn't mounted)
@app.get("/")
async def root():
    return {
        "message": "FinGenie API is running!",
        "docs": "/docs",
        "version": app.version,
    }

# Run locally with: python server/main.py or uvicorn server.main:app --reload
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("server.main:app", host="0.0.0.0", port=port, reload=True)
