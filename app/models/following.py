from .db import db

following = db.Table(
    "following",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("following_id", db.Integer, db.ForeignKey("users.id"))
)
