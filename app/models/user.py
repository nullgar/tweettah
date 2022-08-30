from .db import db
from .following import following
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .following import following
from datetime import datetime, timezone
from sqlalchemy import func

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_pic = db.Column(db.String(350), nullable=True, default='https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg')
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())


    tweets = db.relationship("Tweet", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    image = db.relationship("Image", back_populates="user", cascade="all, delete-orphan")

    followers = db.relationship(
        "User",
        secondary=following,
        primaryjoin=(following.c.user_id == id),
        secondaryjoin=(following.c.following_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'profile_pic': self.profile_pic,
            'email': self.email,
            "followers": [{"user_id": u.id, "user_name": u.name, "user_profile_pic": u.profile_pic} for u in self.following],
            "following": [{"user_id": u.id, "user_name": u.name, "user_profile_pic": u.profile_pic} for u in self.followers],
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
