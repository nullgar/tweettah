from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, following, db
from sqlalchemy.sql import delete

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()




@user_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def toggle_follow(id):
    user_to_follow_id = id
    current_user_id = current_user.id
    # form['csrf_token'].data = request.cookies['csrf_token']
    check_user = User.query.get(user_to_follow_id)


    if check_user:
        follow = (current_user_id, user_to_follow_id)
    else:
        return jsonify('User not found')

    if user_to_follow_id == current_user_id:
        res = {
            "message": "Cannot follow yourself"
        }
        return jsonify(res)


    user = User.query.get(current_user_id).to_dict()
    for check_if_following in user['following']:

        if check_if_following['user_id'] == user_to_follow_id:
            unFollow = delete(following).where(
            following.c.user_id==current_user_id,
            following.c.following_id==user_to_follow_id
            )

            db.engine.execute(unFollow)
            updatedUser = User.query.get(current_user_id).to_dict()
            return jsonify(updatedUser['following'])
    newFollow = following.insert().values(follow)
    db.engine.execute(newFollow)
    updatedUser = User.query.get(current_user_id).to_dict()

    return jsonify(updatedUser['following'])
