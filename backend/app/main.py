from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="News Insight Pro API",
    description="AI-powered news summary and sentiment analysis API",
    version="1.0.0"
)

# CORS Middleware Setup
# In production, specify actual origins instead of ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """
    Root endpoint to verify the server is running.
    """
    return {"message": "Hello World", "project": "News Insight Pro"}

@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring.
    """
    return {"status": "healthy"}
