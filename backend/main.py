from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database import engine
from models import Base

from routers.analyze import router as analyze_router
from routers.auth import router as auth_router
from routers.history import router as history_router
from routers.logo import router as logo_router

# =====================================================
# CREATE DATABASE
# =====================================================

Base.metadata.create_all(bind=engine)

# =====================================================
# FASTAPI
# =====================================================

app = FastAPI(
    title="DesignDNA API",
    version="2.1.0",
    description="AI Powered Design Analysis",
)

# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# STATIC FILES
# =====================================================

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

# =====================================================
# ROUTERS
# =====================================================

app.include_router(analyze_router)
app.include_router(auth_router)
app.include_router(history_router)
app.include_router(logo_router)