import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTweetComment } from "../../store/comments";
import './CreateComment.css'


const CreateComment = ({tweetId}) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([])
    const profile_pic = useSelector(state => state.session.user.profile_pic);
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
        profile_pic ?
        <div className="create-comment-master-div">
            <img className="create-comment-image" src={profile_pic}/>
            <form className="create-comment-form" action="POST" onSubmit={handleComment}>
                <div className="create-tweet-errors-div">
                    { errors ? errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    )) : null}
                </div>
                <textarea
                value={comment}
                minLength='1'
                maxLength='150'
                className='create-comment-text-area'
                onChange={e => setComment(e.target.value)}
                onInput={() => {
                    const area = document.querySelector('.create-comment-text-area')
                    area.setAttribute("style", "height:" + (0) + "px;overflow-y:hidden;");
                    area.setAttribute("style", "height:" + (area.scrollHeight) + "px;overflow-y:hidden;");
                }}
                placeholder='Comment Your Reply'
                >

                </textarea>
                <button className="create-comment-submit-button">Reply</button>
            </form>
        </div> : null
    )
}

export default CreateComment;
