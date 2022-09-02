import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTweetComment } from "../../store/comments";


const CreateComment = ({tweetId}) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const handleComment = async (e) => {
        e.preventDefault()

        const newTweet = {
            comment: comment,
            tweetId: Number(tweetId),
        }

        const res = await dispatch(createTweetComment(newTweet))

        setComment('')
    }
    return (
        <div>
            <form action="POST" onSubmit={handleComment}>
                Comment: <input value={comment} onChange={e => setComment(e.target.value)}>

                </input>
                <button>Post Comment</button>
            </form>
        </div>
    )
}

export default CreateComment;
