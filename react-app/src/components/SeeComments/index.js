import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTweetsComments } from "../../store/comments";
import EditCommentModal from "../EditCommentModal";
import Spinner from "../Spinner";
import './SeeComments.css'
const SeeComments = ({comments}) => {
    const {tweetId} = useParams()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState({})
    const [showModal, setShowModal] = useState(false);
    // const comments = useSelector(state => state.comments)
    const userId = useSelector(state => state.session.user.id)
    useEffect(() => {
        dispatch(getAllTweetsComments(tweetId))
        const clear = setTimeout(() => {
            setLoaded(true)
        }, 1000)
        return () => clearTimeout(clear)
    }, [dispatch, tweetId])

    return (
        comments && userId && loaded && commentToEdit ?
        <div className="see-comments-master-div">
            {Object.values(comments).length > 0 ? Object.values(comments).reverse().map(comment => (
                <div className="see-comments-inner-div" key={comment.id}>
                    <img className="comment-user-image" src={comment.profile_pic} alt='' />
                    <div className="see-comments-info-div">
                        <div>{comment.username}</div>
                        <div className="see-comments-p">{comment.comment}</div>

                        {userId === comment.user_id ? <i onClick={() => {setShowModal(true); setCommentToEdit(comment)}} className="fa-solid fa-ellipsis modal-click"></i> : null}
                    </div>
                </div>
            )) : <div className="see-comments-no-comment">No comments yet! Be the first to comment.</div>}
            {<EditCommentModal showModal={showModal} setShowModal={setShowModal} comment={commentToEdit} />}
        </div> : <div className="no-comments-spinner-div"><Spinner /></div>
    )
}

export default SeeComments;
