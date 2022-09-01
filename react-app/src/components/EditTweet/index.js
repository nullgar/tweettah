import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteTweet, editTweet } from "../../store/tweets";
import './EditTweet.css'

const EditTweet = ({tweet}) => {
    const [editedTweet, setEditedTweet] = useState(tweet.tweet)
    const {tweetId} = useParams()
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
            tweet: editedTweet
        }

        const res = dispatch(editTweet(changedtweet))

        if (res) {
            document.querySelector('.tweet-edit-text-area').innerHTML = editedTweet
        }
    }
    const handleDeleteTweet = async (e, tweetId) => {
        e.preventDefault()

        const res = dispatch(deleteTweet(tweetId))
        if (res) history.push(`/${user.id}`)
    }
    return (
        <div className="tweet-edit-master-div">

            <form action="PUT">

                <div
                contentEditable={true}
                className='tweet-edit-text-area'
                type="textbox"
                // value={editedTweet}
                // onChange={e => setEditedTweet(e.target.value)}
                onInput={(e) => setEditedTweet(e.target.innerHTML)}
                >

                </div>
            </form>
            <div className="tweet-edit-buttons-div">
                <button className="tweet-edit-button" onClick={(e) => handleEditTweet(e)}>Edit Tweet</button>
                <button className="tweet-edit-delete-button" onClick={(e) => handleDeleteTweet(e, tweet.id)}>Delete Tweet</button>

            </div>
        </div>
    )
}

export default EditTweet;
