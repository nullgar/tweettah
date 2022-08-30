from flask import Blueprint, jsonify, request
from app.models import db, Comment
from flask_login import current_user, login_required
from ..forms.comment_form import CommentForm, DeleteCommentForm

comment_routes = Blueprint('comment', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Edit a comment

@comment_routes.route('/<int:comment_id>', methods=["PUT"])
@login_required
def edit_a_comment(comment_id):
    user = current_user.id
    query = Comment.query.get(comment_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if query and query.user_id == user and form.validate_on_submit():
        query.comment = data['comment']
        db.session.commit()
        return jsonify('Successfully edited Comment!')
    return jsonify(comment_id)

#Delete a comment
