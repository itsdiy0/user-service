from typing import Optional
from fastapi import HTTPException, status
from core.database import get_database
from core.security import get_password_hash, verify_password
from models.user import UserInDB
from schemas.user import UserCreate
from datetime import datetime
from bson import ObjectId

class UserService:
    @property
    def collection(self):
        db = get_database()
        if db is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Database not connected"
            )
        return db.users
    
    async def create_user(self, user_data: UserCreate) -> UserInDB:
        # Check if user already exists
        existing_user = await self.collection.find_one({
            "$or": [
                {"email": user_data.email},
                {"username": user_data.username}
            ]
        })
        
        if existing_user:
            if existing_user["email"] == user_data.email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already taken"
                )

        # Create user document
        user_dict = {
            "email": user_data.email,
            "username": user_data.username,
            "full_name": user_data.full_name,
            "hashed_password": get_password_hash(user_data.password),
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        # Insert user
        result = await self.collection.insert_one(user_dict)
        user_dict["_id"] = result.inserted_id
        
        return UserInDB(**user_dict)

    async def authenticate_user(self, email: str, password: str) -> Optional[UserInDB]:
        user_doc = await self.collection.find_one({"email": email})
        
        if not user_doc:
            return None
        
        if not verify_password(password, user_doc["hashed_password"]):
            return None
            
        return UserInDB(**user_doc)

    async def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        user_doc = await self.collection.find_one({"email": email})
        
        if user_doc:
            return UserInDB(**user_doc)
        return None

    async def get_user_by_id(self, user_id: str) -> Optional[UserInDB]:
        if not ObjectId.is_valid(user_id):
            return None
            
        user_doc = await self.collection.find_one({"_id": ObjectId(user_id)})
        
        if user_doc:
            return UserInDB(**user_doc)
        return None

user_service = UserService()