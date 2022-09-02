import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteTweet, editTweet } from "../../store/tweets";
import './EditTweet.css'

const EditTweet = ({tweet, setShow}) => {
    const [editedTweet, setEditedTweet] = useState(tweet.tweet)
    const {tweetId} = useParams()
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        document.querySelector('.tweet-edit-text-area').innerHTML = editedTweet

    }, [])
    const handleEditTweet = async (e) => {
        e.preventDefault()

        const changedtweet = {
            user_id: user.id,
            id: tweetId,
            tweet: editedTweet.trimStart()
        }

        const res = await dispatch(editTweet(changedtweet))

        if (res.errors) {
            setErrors(res.errors)
        } else if (res) {
            setErrors([])
            setShow(false)
        }
    }
    const handleDeleteTweet = async (e, tweetId) => {
        e.preventDefault()

        const res = dispatch(deleteTweet(tweetId))
        if (res) history.push(`/${user.id}`)
    }
    return (
        <div className="tweet-edit-master-div">
            <div className="edit-tweet-errors-div">
                    { errors ? errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    )) : null}
            </div>

            <form action="PUT">
                <textarea
                className='tweet-edit-text-area'
                type="text"
                value={editedTweet}
                onChange={e => setEditedTweet(e.target.value)}
                onInput={(e) => {
                    const area = document.querySelector('.tweet-edit-text-area')
                    area.setAttribute("style", "height:" + (0) + "px;overflow-y:hidden;");
                    area.setAttribute("style", "height:" + (area.scrollHeight) + "px;overflow-y:hidden;");
                }}
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

export default EditTweet;
