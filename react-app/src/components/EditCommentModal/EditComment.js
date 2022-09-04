import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEditedComment, deleteComment } from "../../store/comments";

const EditComment = ({setShowModal, comment}) => {
    const [editedComment, setEditedComment] = useState(comment.comment)
    const dispatch = useDispatch()

    const handleEditTweet = (e) => {
        e.preventDefault()
        const newComment = {
            comment: editedComment,
            commentId: comment.id
        }
        dispatch(createEditedComment(newComment))
        setShowModal(false)
    }

    const handleCommentDelete = (e, comment_id) => {
        e.preventDefault()

        dispatch(deleteComment(comment_id))
        setShowModal(false)
    }

    return(
        <div>
            <form action="PUT" onSubmit={handleEditTweet}>
                <input
                value={editedComment}
                onChange={e => setEditedComment(e.target.value)}
                >
                </input>
                <button>Edit Comment</button>
            </form>
            <button onClick={(e) => handleCommentDelete(e, comment.id)}>Delete Comment</button>

        </div>
    )
}


export default EditComment;
