from flask import Blueprint, jsonify, request
from app.models import comment, db, Tweet
from flask_login import current_user, login_required
from ..forms.tweet_form import TweetForm

tweet_routes = Blueprint('tweet',__name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@tweet_routes.route('/')
@login_required
def get_current_user_tweets():
    user = current_user.to_dict()
    loadTweets = Tweet.query.get(user['id'])
    loadTweets = loadTweets.to_dict()

    return loadTweets


@tweet_routes.route('/<int:userId>')
@login_required
def get_a_users_tweets(userId):
    users_tweets = Tweet.query.get(userId)
    users_tweets = users_tweets.to_dict()
    return users_tweets


@tweet_routes.route('/new', methods=["POST"])
@login_required
def create_a_new_tweet():
    user = current_user.to_dict()
    print(user)
    id = user['id']
    form = TweetForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']
    new_Tweet = Tweet(
        user_id = id,
        tweet = data["tweet"]
    )
    db.session.add(new_Tweet)
    db.session.commit()
    new_Tweet = new_Tweet.to_dict()

    return jsonify(new_Tweet)
