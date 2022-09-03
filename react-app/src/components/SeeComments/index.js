import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTweetsComments } from "../../store/comments";
import EditCommentModal from "../EditCommentModal";
import Spinner from "../Spinner";

const SeeComments = () => {
    const {tweetId} = useParams()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const comments = useSelector(state => state.comments)
    const userId = useSelector(state => state.session.user.id)
    useEffect(() => {
        dispatch(getAllTweetsComments(tweetId))
        const clear = setTimeout(() => {
            setLoaded(true)
        }, 1000)
        return () => clearTimeout(clear)
    }, [dispatch, tweetId])

    return (
        comments && loaded ?
        <div>
            {Object.values(comments).length > 0 ? Object.values(comments).map(comment => (
                <div key={comment.id}>
                    <div>{comment.comment}</div>
                    { userId === comment.user_id ? <EditCommentModal comment={comment} /> : null}
                </div>
            )) : <h1>No Comments</h1>}
        </div> : <Spinner />
    )
}

export default SeeComments;
