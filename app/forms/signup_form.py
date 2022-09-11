from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length, Email
from app.models import User

def check_password(form, field):
    #Checking if password and repeat password match
    password = form.data['password']
    repeatPassword = form.data['repeatPassword']
    if password != repeatPassword:
        raise ValidationError('Password and Repeat Password must match!')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'Username', validators=[
            DataRequired(message='Username field cannot be empty!'),
            Length(min=2, message='Username needs to be at least 2 characters long!'),
            Length(max=20, message='Username needs to be at less than 20 characters long!'),
            username_exists])
    email = StringField('Email', validators=[
        DataRequired(message='Email cannot be empty!'),
        Length(min=4, message='Email needs to be at least 4 characters long!'),
        Length(max=30, message='Email needs to be at less than 30 characters long!'),
        Email(),
        user_exists])

    password = StringField('Password', validators=[
        DataRequired(message='Password cannot be empty!'),
        Length(min=5, message='Password needs to be at least 5 characters long!'),
        Length(max=30, message='Password needs to be at less than 30 characters long!'),
        check_password])
    repeatPassword = StringField('Repeat Password', validators=[DataRequired(message='Repeat Password cannot be empty!')])
