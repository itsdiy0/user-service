from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongo_initdb_root_username: str
    mongo_initdb_root_password: str
    mongodb_url: str
    database_name: str
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    allowed_hosts: list[str] = ["*"]
    
    class Config:
        env_file = "../.env"

settings = Settings()