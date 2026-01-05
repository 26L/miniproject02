from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field

# User Base
class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    full_name: Optional[str] = None

# User 생성 (회원가입)
class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=100)

# User 업데이트
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    full_name: Optional[str] = None
    password: Optional[str] = Field(None, min_length=6, max_length=100)

# User 응답
class UserResponse(UserBase):
    id: int
    is_active: bool
    is_superuser: bool
    created_at: datetime

    class Config:
        from_attributes = True

# 로그인 요청
class LoginRequest(BaseModel):
    username: str
    password: str

# Token 응답
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Token 데이터
class TokenData(BaseModel):
    user_id: Optional[int] = None
    username: Optional[str] = None
