from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Length


class ImageForm(FlaskForm):
    user_id = IntegerField("User Id")
    tweet_id = IntegerField("Tweet Id")
    url = FileField("Image")

    # StringField("Url", validators=[
    #     DataRequired(),
    #     Length(
    #         min=1,
    #         max=350,
    #         message="Url needs to be between 1 an 350 characters!"
    #     )])


class DeleteImageForm(FlaskForm):
    pass
