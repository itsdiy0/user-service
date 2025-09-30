from fastapi import FastAPI, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings
from api.routes import auth
from core.database import connect_to_mongo, close_mongo_connection
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

app = FastAPI(title="My FastAPI App", version="1.0.0",lifespan=lifespan)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

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

