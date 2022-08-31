from app.models import tweet
from .db import db
from sqlalchemy import func
from datetime import datetime, timezone


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    tweet_id = db.Column(db.Integer, db.ForeignKey("tweets.id"), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    url = db.Column(db.String(350), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    # Dont need these
    tweets = db.relationship("Tweet", back_populates="image")
    user = db.relationship("User", back_populates="image")


    def to_dict(self):
        return {
            'id': self.id,
            'tweet_id': self.tweet_id,
            'user_id': self.user_id,
            'url': self.url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
