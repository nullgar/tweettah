import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEditedComment, deleteComment } from "../../store/comments";
import './EditComment.css'
const EditComment = ({setShowModal, comment}) => {
    const [editedComment, setEditedComment] = useState(comment.comment)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    const handleEditTweet = async (e) => {
        e.preventDefault()
        const newComment = {
            comment: editedComment.trimStart(),
            commentId: comment.id
        }

        const res = await dispatch(createEditedComment(newComment));

        if (res?.errors) {
            setErrors(res.errors)
        } else if (!res?.errors) {
            setErrors([])
            setShowModal(false)

        }
    }

    const handleCommentDelete = (e, comment_id) => {
        e.preventDefault()

        dispatch(deleteComment(comment_id))

        setShowModal(false)
    }

    return(
        <div className="edit-comment-modal-div">
            <form className="edit-comment-modal-form" action="PUT" onSubmit={handleEditTweet}>
                <div className='edit-comment-modal-errors'>
                    { errors ? errors.map((error, ind) => (
                        <div className='create-comment-errors-div' key={ind}>{error}</div>
                    )) : null}
                </div>
                <textarea
                value={editedComment}
                className='edit-comment-modal-text-area'
                onChange={e => setEditedComment(e.target.value)}
                maxLength='150'
                minLength='1'
                >
                </textarea>
                <button className="edit-comment-modal-submit-button" onClick={e => handleEditTweet(e)}>Edit Comment</button>
                <button className="edit-comment-modal-delete-button" onClick={(e) => handleCommentDelete(e, comment.id)}>Delete Comment</button>
            </form>

        </div>
    )
}


export default EditComment;
