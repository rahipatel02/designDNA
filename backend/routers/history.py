import json

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from database import get_db
from models import Analysis
from models import User

from security import get_current_user

router = APIRouter(
    tags=["History"]
)

# =====================================================
# HISTORY LIST
# =====================================================

@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    analyses = (
        db.query(Analysis)
        .filter(
            Analysis.user_id == current_user.id
        )
        .order_by(
            Analysis.created_at.desc()
        )
        .limit(6)
        .all()
    )

    return [

        {
            "id": analysis.id,

            "image_name": analysis.image_name,

            "image_path": "/" + analysis.image_path.replace("\\", "/"),

            "score": analysis.score,

            "created_at": analysis.created_at,

        }

        for analysis in analyses

    ]


# =====================================================
# SINGLE ANALYSIS
# =====================================================

@router.get("/history/{analysis_id}")
def get_analysis(
    analysis_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    analysis = (
        db.query(Analysis)
        .filter(
            Analysis.id == analysis_id,
            Analysis.user_id == current_user.id,
        )
        .first()
    )

    if not analysis:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found."
        )

    return {

        "id": analysis.id,

        "image_name": analysis.image_name,

        "image_path": "/" + analysis.image_path.replace("\\", "/"),
        
        "score": analysis.score,

        "brightness": analysis.brightness,

        "contrast": analysis.contrast,

        "sharpness": analysis.sharpness,

        "edge_density": analysis.edge_density,

        "whitespace": analysis.whitespace,

        "dominant_colors": json.loads(
            analysis.dominant_colors
        ) if analysis.dominant_colors else [],

        "color_harmony": analysis.color_harmony,

        "feedback": json.loads(
            analysis.feedback
        ) if analysis.feedback else [],

        "created_at": analysis.created_at,

    }