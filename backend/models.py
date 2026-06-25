from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Float,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from database import Base


# =====================================================
# USER MODEL
# =====================================================

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )

    hashed_password = Column(
        String,
        nullable=False
    )

    role = Column(
        String,
        default="user",
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    # One User -> Many Analyses
    analyses = relationship(
        "Analysis",
        back_populates="user",
        cascade="all, delete"
    )


# =====================================================
# ANALYSIS MODEL
# =====================================================

class Analysis(Base):

    __tablename__ = "analyses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    image_name = Column(
        String,
        nullable=False
    )

    score = Column(
        Integer,
        nullable=False
    )

    brightness = Column(
        Float
    )

    contrast = Column(
        Float
    )

    sharpness = Column(
        Float
    )

    edge_density = Column(
        Float
    )

    whitespace = Column(
        Float
    )

    dominant_colors = Column(
        String,
        nullable=True
    )

    color_harmony = Column(
        String,
        nullable=True
    )

    feedback = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    # Many Analyses -> One User
    user = relationship(
        "User",
        back_populates="analyses"
    )