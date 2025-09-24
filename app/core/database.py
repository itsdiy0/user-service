from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings
import logging

class Database:
    client: AsyncIOMotorClient = None
    database = None

db = Database()

async def connect_to_mongo():
    try:
        db.client = AsyncIOMotorClient(settings.mongodb_url)
        db.database = db.client[settings.database_name]
        await db.client.admin.command('ping')
        logging.info("Successfully connected to MongoDB")
        
    except Exception as e:
        logging.error(f"Error connecting to MongoDB: {e}")
        raise

async def close_mongo_connection():
    if db.client:
        db.client.close()
        logging.info("Disconnected from MongoDB")

def get_database():
    return db.database