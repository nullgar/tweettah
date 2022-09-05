from .db import db
from .user import User
from sqlalchemy import func
from datetime import datetime, timezone


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey("tweets.id"), nullable=False)
    comment = db.Column(db.String(150), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    user = db.relationship("User", back_populates="comments")
    tweets = db.relationship("Tweet", back_populates="comments")

    def to_dict(self):
        comment_user = User.query.get(self.user_id)
        return {
            'id': self.id,
            'user_id': self.user_id,
            'tweet_id': self.tweet_id,
            'profile_pic': comment_user.profile_pic,
            'username': comment_user.username,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
