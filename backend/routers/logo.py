from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from database import get_db

from models import LogoGeneration
from models import User

from security import get_current_user

from schemas import LogoGenerateRequest

from services.logo import (
    create_placeholder_logo,
    save_logo,
    get_user_logos,
    delete_logo,
)

router = APIRouter(
    prefix="/logo",
    tags=["Logo Generator"],
)


# =====================================================
# GENERATE
# =====================================================

@router.post("/generate")
def generate_logo(
    request: LogoGenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    image_path = create_placeholder_logo()

    logo = save_logo(
        db=db,
        user_id=current_user.id,
        prompt=request.prompt,
        style=request.style,
        image_path=image_path,
    )

    return {
        "id": logo.id,
        "prompt": logo.prompt,
        "style": logo.style,
        "image_path": "/" + logo.image_path.replace("\\", "/"),
        "created_at": logo.created_at,
    }


# =====================================================
# LOGO HISTORY
# =====================================================

@router.get("/history")
def logo_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    logos = get_user_logos(
        db,
        current_user.id,
    )

    return [

        {
            "id": logo.id,
            "prompt": logo.prompt,
            "style": logo.style,
            "image_path": "/" + logo.image_path.replace("\\", "/"),
            "created_at": logo.created_at,
        }

        for logo in logos

    ]


# =====================================================
# DELETE
# =====================================================

@router.delete("/{logo_id}")
def remove_logo(
    logo_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    logo = (

        db.query(LogoGeneration)

        .filter(
            LogoGeneration.id == logo_id,
            LogoGeneration.user_id == current_user.id,
        )

        .first()

    )

    if not logo:

        raise HTTPException(
            status_code=404,
            detail="Logo not found.",
        )

    delete_logo(
        db,
        logo,
    )

    return {
        "message": "Logo deleted successfully."
    }