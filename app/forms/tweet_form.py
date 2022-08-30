from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
from app.models import Tweet, tweet


class TweetForm(FlaskForm):
    user_id = IntegerField("User Id")
    tweet = StringField("Tweet", validators=[DataRequired(),
    Length(
        min=1,
        max=150,
        message="Tweet needs to be between 1 - 150 characters!"
    )
    ])
    # created_at = StringField("Created At")
    # updated_at = StringField("Updated At")
