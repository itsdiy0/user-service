from fastapi import FastAPI, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings
from api.routes import auth
from core.database import connect_to_mongo, close_mongo_connection
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="User Service API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_hosts,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()
    
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

