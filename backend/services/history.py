import json

from sqlalchemy.orm import Session

from models import Analysis


def save_analysis(
    db: Session,
    user_id: int,
    image_name: str,
    image_path: str,
    result: dict,
):

    analysis = Analysis(

        user_id=user_id,

        image_name=image_name,

        image_path=image_path,

        score=result["result"]["score"],

        brightness=result["analysis"]["brightness"],

        contrast=result["analysis"]["contrast"],

        sharpness=result["analysis"]["sharpness"],

        edge_density=result["analysis"]["edge_density"],

        whitespace=result["analysis"]["whitespace"],

        dominant_colors=json.dumps(
            result["colors"]["dominant_colors"]
        ),

        color_harmony=result["colors"]["harmony"],

        feedback=json.dumps(
            result["feedback"]
        ),
    )

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    return analysis