from datetime import datetime

from pydantic import BaseModel, EmailStr


# =====================================================
# USER REGISTER REQUEST
# =====================================================

class UserCreate(BaseModel):

    name: str

    email: EmailStr

    password: str


# =====================================================
# USER LOGIN REQUEST
# =====================================================

class UserLogin(BaseModel):

    email: EmailStr

    password: str


# =====================================================
# USER RESPONSE
# =====================================================

class UserResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    role: str

    created_at: datetime

    class Config:
        from_attributes = True


# =====================================================
# ANALYSIS RESPONSE
# =====================================================

class AnalysisResponse(BaseModel):

    id: int

    user_id: int

    image_name: str

    score: int

    brightness: float

    contrast: float

    sharpness: float

    edge_density: float

    whitespace: float

    created_at: datetime

    class Config:
        from_attributes = True


# =====================================================
# JWT TOKEN RESPONSE
# =====================================================

class Token(BaseModel):

    access_token: str

    token_type: str


# =====================================================
# JWT TOKEN DATA
# =====================================================

class TokenData(BaseModel):

    email: str | None = None

# =====================================================
# LOGO REQUEST
# =====================================================

class LogoGenerateRequest(BaseModel):

    prompt: str

    style: str = "Modern"


# =====================================================
# LOGO RESPONSE
# =====================================================

class LogoResponse(BaseModel):

    id: int

    prompt: str

    style: str

    image_path: str

    created_at: datetime

    class Config:
        from_attributes = True