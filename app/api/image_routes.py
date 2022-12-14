from flask import Blueprint, jsonify, request
from app.models import db, Image
from flask_login import current_user, login_required
from app.forms import ImageForm, DeleteImageForm
from app.models.tweet import Tweet

image_routes = Blueprint("image", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#Get images for a tweet
@image_routes.route("/<int:tweet_id>")
@login_required
def get_tweets_images(tweet_id):
    load_images = {}
    query = Image.query.filter(Image.tweet_id == tweet_id)
    for image in query:
        if image not in load_images:
            load_images[image.id] = image.to_dict()

    if load_images:
        return load_images
    else:
        res = {
            "message": "Tweet not found",
            "statusCode": 404
        }
        return jsonify(res)

#Create an Image for a tweet
@image_routes.route("/<int:tweet_id>", methods=["POST"])
@login_required
def create_tweet_image(tweet_id):
    user_id = current_user.id
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    tweet = Tweet.query.get(tweet_id)
    new_image = Image(
        user_id = user_id,
        tweet_id = tweet_id,
        url = data["url"]
    )

    if tweet and new_image and new_image.id == user_id and form.validate_on_submit():
        db.session.add(new_image)
        db.session.commit()
        return jsonify('Image created succesfully!')
    elif form.errors:
        return jsonify(form.errors)
    else:
        res = {
            "message": "Tweet not found",
            "statusCode": 404
        }
        return jsonify(res)

#Delete an image from a tweet
@image_routes.route("/<int:tweet_id>/<int:image_id>", methods=["DELETE"])
@login_required
def delete_tweet_image(tweet_id, image_id):
    user_id = current_user.id
    form = DeleteImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    tweet = Tweet.query.get(tweet_id)
    image = Image.query.get(image_id)
    # image = image.to_dict()
    # print(tweet.to_dict())
    if tweet and image and tweet.user_id == user_id and form.validate_on_submit():
        db.session.delete(image)
        db.session.commit()
        return jsonify('Successfully deleted image!')
    else:
        res = {
            "message": "Tweet not found",
            "statusCode": 404
        }
        return jsonify(res)
