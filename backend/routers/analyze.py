from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends
from models import Analysis
from services.dashboard import get_dashboard_stats

from sqlalchemy.orm import Session

from database import get_db
from models import User

from security import get_current_user

from services.analysis import analyze_image_file
from services.history import save_analysis

router = APIRouter()


# =====================================================
# HOME
# =====================================================

@router.get("/")
def home():

    return {
        "message": "DesignDNA Backend Running",
        "version": "V22"
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

    # Read uploaded image
    contents = await file.read()

    # Run AI analysis
    result = analyze_image_file(contents)

    # Save analysis into database
    save_analysis(
        db=db,
        user_id=current_user.id,
        image_name=file.filename,
        result=result,
    )

    # Return analysis to frontend
    return result

# =====================================================
# DEBUG ANALYSES
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

@router.get("/debug/analyses")
def debug_analyses(
    db: Session = Depends(get_db),
):
    analyses = db.query(Analysis).all()

    return [
        {
            "id": a.id,
            "user_id": a.user_id,
            "image_name": a.image_name,
            "score": a.score,
        }
        for a in analyses
    ]