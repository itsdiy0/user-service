from fastapi import FastAPI, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings

app = FastAPI(title="My FastAPI App", version="1.0.0")

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/db-health")
async def database_health_check():
    try:
        client = AsyncIOMotorClient(settings.mongodb_url)
        await client.admin.command('ping')
        client.close()
        return {
            "status": "connected",
            "database": "MongoDB",
            "message": "Database connection successful"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "status": "disconnected",
                "database": "MongoDB", 
                "error": str(e)
            }
        )