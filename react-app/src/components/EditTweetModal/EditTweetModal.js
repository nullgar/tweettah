import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EditTweetModal from ".";
import { deleteTweet, editTweet } from "../../store/tweets";
import './EditTweetModal.css'

const EditTweet = ({tweet, setShowModal}) => {
    const [editedTweet, setEditedTweet] = useState(tweet.tweet)
    // const {tweetId} = useParams()
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)


    // useEffect(() => {
    //     const area = document.querySelector('.modal-tweet-edit-text-area')
    //     area.setAttribute("style", "height:" + (0) + "px;overflow-y:hidden;");
    //     area.setAttribute("style", "height:" + (area.scrollHeight) + "px;overflow-y:hidden;");
    // }, []);

    const handleEditTweet = async (e) => {
        e.preventDefault()

        const changedtweet = {
            user_id: user.id,
            id: tweet.id,
            tweet: editedTweet.trimStart()
        }

        const res = await dispatch(editTweet(changedtweet))

        if (res.errors) {
            setErrors(res.errors)
        } else if (res) {
            setErrors([])
            setShowModal(false)
        }
    }
    const handleDeleteTweet = async (e, tweetId) => {
        e.preventDefault()

        const res = dispatch(deleteTweet(tweetId))
        setShowModal(false)
        if (res) history.push(`/`)
    }
    return (
        <div className="tweet-edit-master-div">
            <div className="edit-tweet-errors-div">
                    { errors ? errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    )) : null}
            </div>

            <form className="edit-form" action="PUT">
                <textarea
                className='modal-tweet-edit-text-area'
                type="text"
                value={editedTweet}
                onChange={e => setEditedTweet(e.target.value)}
                minLength={1}
                maxLength={150}
                // onInput={(e) => {
                //     const area = document.querySelector('.modal-tweet-edit-text-area')
                //     area.setAttribute("style", "height:" + (0) + "px;overflow-y:hidden;");
                //     area.setAttribute("style", "height:" + (area.scrollHeight) + "px;overflow-y:hidden;");
                //     console.log('area', area)
                // }}
                >

                </textarea>
            </form>
            <div className="tweet-edit-buttons-div">
                <button className="tweet-edit-button" onClick={(e) => handleEditTweet(e)}>Edit Tweet</button>
                <button className="tweet-edit-delete-button" onClick={(e) => handleDeleteTweet(e, tweet.id)}>Delete Tweet</button>

            </div>
        </div>
    )
}

export default EditTweet;;
