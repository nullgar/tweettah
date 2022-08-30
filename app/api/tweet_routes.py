from crypt import methods
from flask import Blueprint, jsonify, request
from app.models import comment, db, Tweet, user
from flask_login import current_user, login_required
from ..forms.tweet_form import TweetForm, DeleteForm

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
    loadTweets = {}
    query = Tweet.query.filter(Tweet.user_id == user['id'])
    for tweet in query:
        if tweet not in loadTweets:
            loadTweets[tweet.id] = tweet.to_dict()


    return loadTweets


@tweet_routes.route('/<int:user_id>')
@login_required
def get_a_users_tweets(user_id):
    users_tweets = {}
    query = Tweet.query.filter(Tweet.user_id == user_id)
    for tweet in query:
        if tweet not in users_tweets:
            users_tweets[tweet.id] = tweet.to_dict()

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

    return new_Tweet


@tweet_routes.route('/edit/<int:tweet_id>', methods=["PUT"])
@login_required
def edit_a_tweet(tweet_id):
    user_id = current_user.id
    form = TweetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    tweet_to_be_edited = Tweet.query.get(tweet_id)

    if tweet_to_be_edited and tweet_to_be_edited.user_id == user_id and form.validate_on_submit():
        tweet_to_be_edited.tweet = data['tweet']
        db.session.commit()
        return jsonify("Success")
    elif form.errors:
        return jsonify(form.errors)
    else:
        res = {
            "message": "Tweet not found",
            "statusCode": 404
        }
        return jsonify(res)

@tweet_routes.route('/delete/<int:tweet_id>', methods=["Delete"])
@login_required
def delete_a_tweet(tweet_id):
    user_id = current_user.id
    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    to_be_deleted = Tweet.query.get(tweet_id)

    if to_be_deleted and to_be_deleted.user_id == user_id and form.validate_on_submit():
        db.session.delete(to_be_deleted)
        db.session.commit()
        return jsonify('Successfully deleted Tweet!')
    else:
        res = {
            "message": "Permission Denied",
            "statusCode": 403
        }
        return jsonify(res)
