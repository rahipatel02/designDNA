from sqlalchemy.orm import Session

from models import Analysis
from models import LogoGeneration


def get_dashboard_stats(
    db: Session,
    user_id: int,
):
    analyses = (
        db.query(Analysis)
        .filter(Analysis.user_id == user_id)
        .all()
    )

    logos = (
        db.query(LogoGeneration)
        .filter(LogoGeneration.user_id == user_id)
        .all()
    )

    total_designs = len(analyses)
    total_logos = len(logos)

    if total_designs == 0:
        average = 0
    else:
        average = round(
            sum(a.score for a in analyses) / total_designs,
            1,
        )

    return {
        "designs_analyzed": total_designs,
        "ai_logos": total_logos,
        "average_score": average,
    }