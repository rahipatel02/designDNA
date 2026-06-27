import os
import shutil
import uuid

from sqlalchemy.orm import Session

from models import LogoGeneration

UPLOAD_FOLDER = "uploads"


def create_placeholder_logo():

    filename = f"{uuid.uuid4()}.png"

    destination = os.path.join(
        UPLOAD_FOLDER,
        filename,
    )

    shutil.copy(
        "uploads/logo_placeholder.png",
        destination,
    )

    return destination


def save_logo(
    db: Session,
    user_id: int,
    prompt: str,
    style: str,
    image_path: str,
):

    logo = LogoGeneration(
        user_id=user_id,
        prompt=prompt,
        style=style,
        image_path=image_path,
    )

    db.add(logo)

    db.commit()

    db.refresh(logo)

    return logo


# =====================================================
# GET USER LOGOS
# =====================================================

def get_user_logos(
    db: Session,
    user_id: int,
):

    return (

        db.query(LogoGeneration)

        .filter(
            LogoGeneration.user_id == user_id
        )

        .order_by(
            LogoGeneration.created_at.desc()
        )

        .all()

    )


# =====================================================
# DELETE LOGO
# =====================================================

def delete_logo(
    db: Session,
    logo: LogoGeneration,
):

    if os.path.exists(logo.image_path):
        os.remove(logo.image_path)

    db.delete(logo)

    db.commit()