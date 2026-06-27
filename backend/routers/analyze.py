import os
import uuid

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from sqlalchemy.orm import Session

from database import get_db

from models import User
from models import Analysis

from security import get_current_user

from services.analysis import analyze_image_file
from services.dashboard import get_dashboard_stats
from services.history import save_analysis


router = APIRouter()


UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True,
)


# =====================================================
# HOME
# =====================================================

@router.get("/")
def home():

    return {
        "message": "DesignDNA Backend Running",
        "version": "V23"
    }


# =====================================================
# ANALYZE IMAGE
# =====================================================

@router.post("/analyze")
async def analyze_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    contents = await file.read()

    extension = os.path.splitext(
        file.filename
    )[1]

    filename = f"{uuid.uuid4()}{extension}"

    filepath = f"uploads/{filename}"

    with open(filepath, "wb") as image:
        image.write(contents)

    result = analyze_image_file(contents)

    save_analysis(
        db=db,
        user_id=current_user.id,
        image_name=file.filename,
        image_path=filepath,
        result=result,
    )

    return result


# =====================================================
# DASHBOARD
# =====================================================

@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_dashboard_stats(
        db,
        current_user.id,
    )


# =====================================================
# DEBUG
# =====================================================

@router.get("/debug/analyses")
def debug_analyses(
    db: Session = Depends(get_db),
):

    analyses = db.query(
        Analysis
    ).all()

    return [

        {
            "id": a.id,
            "user_id": a.user_id,
            "image_name": a.image_name,
            "image_path": a.image_path,
            "score": a.score,
        }

        for a in analyses

    ]