from crypt import methods
from flask import Blueprint, jsonify, request
from app.models import comment, db, Tweet, Comment
from flask_login import current_user, login_required
from app.forms import TweetForm, DeleteForm
from app.forms import CommentForm

tweet_routes = Blueprint("tweet",__name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

# Get current Users Tweets
@tweet_routes.route('/')
@login_required
def get_current_user_tweets_for_feed():
    user = current_user.to_dict()
    loadTweets = {}
    query = Tweet.query.filter(Tweet.user_id == user['id'])
    for follower in user['following']:
        following_tweets = Tweet.query.filter(Tweet.user_id == follower['user_id'])
        for tweet in following_tweets:
            if tweet not in loadTweets:
                loadTweets[tweet.id] = tweet.to_dict()


    # return user
    for tweet in query:
        if tweet not in loadTweets:
            loadTweets[tweet.id] = tweet.to_dict()

    if query:
        return loadTweets
    else:
        res = {
            "message": "Tweets not found",
            "statusCode": 404
        }
        return res


#Get one users tweets
@tweet_routes.route('/<int:user_id>')
@login_required
def get_a_users_tweets(user_id):
    users_tweets = {}
    query = Tweet.query.filter(Tweet.user_id == user_id)
    for tweet in query:
        if tweet not in users_tweets:
            users_tweets[tweet.id] = tweet.to_dict()

    return users_tweets

@tweet_routes.route('/<int:user_id>/<int:tweet_id>')
@login_required
def get_a_tweet(user_id, tweet_id):
    tweet = Tweet.query.get(tweet_id)
    if tweet.user_id == user_id:
        return tweet.to_dict()
    else:
        res = {
            "message": "Tweets not found",
            "statusCode": 404
        }
        return res

#Create a new tweet
@tweet_routes.route('/new', methods=["POST"])
@login_required
def create_a_new_tweet():
    user = current_user.to_dict()
    id = user['id']
    form = TweetForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']
    new_Tweet = Tweet(
        user_id = id,
        tweet = data["tweet"]
    )

    if form.validate_on_submit():

        db.session.add(new_Tweet)
        db.session.commit()
        new_Tweet = new_Tweet.to_dict()
        return jsonify(new_Tweet)
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Edit a tweet
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
        return tweet_to_be_edited.to_dict()
    elif not tweet_to_be_edited:
        res = {
            "message": "Tweet not found",
            "statusCode": 404
        }
        return jsonify(res)
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Delete a tweet
@tweet_routes.route('/delete/<int:tweet_id>', methods=["DELETE"])
@login_required
def delete_a_tweet(tweet_id):
    user_id = current_user.id
    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    to_be_deleted = Tweet.query.get(tweet_id)

    if to_be_deleted and to_be_deleted.user_id == user_id and form.validate_on_submit():
        db.session.delete(to_be_deleted)
        db.session.commit()
        return jsonify(to_be_deleted.id)
    else:
        res = {
            "message": "Permission Denied",
            "statusCode": 403
        }
        return jsonify(res)

#Get comments
@tweet_routes.route('/<int:tweet_id>/comments')
@login_required
def get_comments(tweet_id):
    comments = {}
    query = Comment.query.filter(Comment.tweet_id == tweet_id)

    for comment in query:
        if comment not in comments:
            comments[comment.id] = comment.to_dict()

    if comments:
        return comments
    else:
        return {'errors': 'No comments found!'}, 404


#Create a comment on Tweet
@tweet_routes.route('/<int:tweet_id>/new-comment', methods=["POST"])
@login_required
def create_a_comment(tweet_id):
    user_id = current_user.id
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    query = Tweet.query.get(tweet_id)

    if query:
        new_comment = Comment(
            user_id = user_id,
            tweet_id = tweet_id,
            comment = data["comment"]
        )
        db.session.add(new_comment)
        db.session.commit()

        return jsonify(new_comment.to_dict())

    return jsonify('hi')
