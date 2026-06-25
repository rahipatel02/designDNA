from sqlalchemy.orm import Session
from sqlalchemy import func

from models import Analysis


def get_dashboard_stats(
    db: Session,
    user_id: int,
):
    analyses = (
        db.query(Analysis)
        .filter(Analysis.user_id == user_id)
        .all()
    )

    total = len(analyses)

    if total == 0:
        average = 0
    else:
        average = round(
            sum(a.score for a in analyses) / total,
            1,
        )

    return {
        "designs_analyzed": total,
        "average_score": average,
    }