import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTweet } from "../../store/tweets";

const CreateTweet = () => {
    const [tweet, setTweet] = useState('')
    const dispatch = useDispatch()
    const handleTweet = (e) => {
        e.preventDefault()

        const newTweet = {
            tweet: tweet
        }



        dispatch(createTweet(newTweet))
        setTweet('')
    }

    return (
        <div>
        <form action="POST" onSubmit={handleTweet}>

            <textarea
            value={tweet}
            onChange={e => setTweet(e.target.value)}
            placeholder="What's happening?">

            </textarea>


            <button>Tweet</button>
        </form>
        </div>
    )
}

export default CreateTweet;
