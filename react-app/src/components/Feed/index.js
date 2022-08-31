import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersFeedTweets } from "../../store/tweets";

const Feed = () => {
    const dispatch = useDispatch()
    const tweets = useSelector(state => state.tweets)
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        dispatch(getAllUsersFeedTweets())
        setLoaded(true)
    }, [dispatch])


    return (
        loaded ? <div>

            {Object.values(tweets).map(tweet => (
                <div key={tweet.id}>
                    {tweet.username}: {tweet.tweet}</div>
            ))}
        </div> : 'wait'
    )
}

export default Feed;
