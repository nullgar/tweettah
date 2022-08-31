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

    check_user = User.query.get(user_to_follow_id)

    if check_user:
        follow = (current_user_id, user_to_follow_id)
    else:
        return jsonify('User not found')
    # user = User.query.get(current_user.id)
    # user = user.to_dict()
    # form['csrf_token'].data = request.cookies['csrf_token']

    if user_to_follow_id == current_user_id:
        return jsonify({
            'error':'Cannot follow yourself'
        })

    user = User.query.get(current_user_id).to_dict()
    for check_if_following in user['following']:

        if check_if_following['user_id'] == user_to_follow_id:
            unFollow = delete(following).where(
            following.c.user_id==current_user_id,
            following.c.following_id==user_to_follow_id
            )

            db.engine.execute(unFollow)
            return jsonify(f'Unfollowed {user_to_follow_id}')
    newFollow = following.insert().values(follow)
    db.engine.execute(newFollow)


    return jsonify(f'Followed {user_to_follow_id}')
    # print(user ,user_to_follow_id)
    # return jsonify('hi')
