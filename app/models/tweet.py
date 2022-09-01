from .db import db
from .user import User
from sqlalchemy import func
from datetime import datetime, timezone

class Tweet(db.Model):
    __tablename__ = 'tweets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    tweet = db.Column(db.String(150), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())



    comments = db.relationship("Comment", back_populates="tweets", cascade="all, delete-orphan")
    user = db.relationship("User", back_populates="tweets")
    image = db.relationship("Image", back_populates="tweets", cascade="all, delete-orphan")


    def to_dict(self):
        tweet_user = User.query.get(self.user_id)
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': tweet_user.username,
            'profile_pic': tweet_user.profile_pic,
            'tweet': self.tweet,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
