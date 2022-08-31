from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, following, db

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
    user = User.query.get(current_user.id)
    user = user.to_dict()
    print(user['following'])

    if current_user.id != id:
        for follower in user['following']:
            if id in follower:
                from sqlalchemy import delete
                sql = delete(following).where(following.c.user_id == current_user.id)
                db.engine.execute(sql)
                return jsonify(f'Un-Followed {user_to_follow_id}')
    if current_user.id != id:
        # if len(user['following']) == 0:
        #     follow = (current_user.id, user_to_follow_id)
        #     sql = following.insert().values(follow)
        #     db.engine.execute(sql)
        #     return jsonify(f'No length Following {user_to_follow_id}')
        # else :
            for follower in user['following']:
                print('!!!!!!!!!!!!!!!', user['following'][0] == id)
                follow = (current_user.id, user_to_follow_id)
                sql = following.insert().values(follow)
                db.engine.execute(sql)
                return jsonify(f'Length Following {user_to_follow_id}')




    # print(user ,user_to_follow_id)
    return jsonify('hi')
