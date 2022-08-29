from .db import db
from sqlalchemy import func
from datetime import datetime, timezone

class Tweet(db.Model):
    __tablename__ = 'tweets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    tweet = db.Column(db.String(150), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())



    comments = db.relationship("Comment", back_populates="tweets", cascade="all, delete-orphan")
    user = db.relationship("User", back_populates="tweets")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'tweet': self.tweet,
            'images': self.images_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
