import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteTweet, editTweet } from "../../store/tweets";


const EditTweet = ({tweet}) => {
    const [editedTweet, setEditedTweet] = useState(tweet.tweet)
    const {tweetId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const handleEditTweet = async (e) => {
        e.preventDefault()

        const changedtweet = {
            user_id: user.id,
            id: tweetId,
            tweet: editedTweet
        }

        dispatch(editTweet(changedtweet))
    }
    const handleDeleteTweet = async (e, tweetId) => {
        e.preventDefault()

        const res = dispatch(deleteTweet(tweetId))
        if (res) history.push(`/${user.id}`)
    }
    return (
        <div>

            <form action="PUT" onSubmit={handleEditTweet}>

                <textarea
                value={editedTweet}
                onChange={e => setEditedTweet(e.target.value)}>


                </textarea>
                <button>Edit Tweet</button>
            </form>
            <button onClick={(e) => handleDeleteTweet(e, tweet.id)}>Delete Tweet</button>
        </div>
    )
}

export default EditTweet;
