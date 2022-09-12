from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
from app.models import Comment

class CommentForm(FlaskForm):

    user_id = IntegerField("User Id")
    tweet_id = IntegerField("Tweet Id")
    comment = StringField("Comment", validators=[
        Length(
            min=1,
            max=150,
            message="Comments need to be between 1 - 150 characters!"
        )
    ])


class DeleteCommentForm(FlaskForm):
    pass
