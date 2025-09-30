from datetime import datetime,timezone
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId

# mongodb ObjectId validation and serialization for Pydantic 
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    @classmethod
    def validate(cls, v, field=None):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)
    # for fastAPI docs
    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")

class UserInDB(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: str
    username: str
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=datetime.now(timezone.utc))

    class Config:
        allow_population_by_field_name = True  # Allow using both 'id' and '_id'
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}