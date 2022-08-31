import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsersFeedTweets } from "../../store/tweets";
import CreateTweet from "../CreateTweet";

const Feed = () => {
    const dispatch = useDispatch()
    const tweets = useSelector(state => state.tweets)
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        dispatch(getAllUsersFeedTweets())
        const clear = setTimeout(() => {
            setLoaded(true)
          }, 150)

        return () => clearTimeout(clear)

    }, [dispatch])


    return (
        <div>

            <CreateTweet />
            {loaded ? <div>
            {Object.values(tweets).map(tweet => (
                <div key={tweet.id}>
                    <Link to={`/${tweet.user_id}`}>{tweet.username}</Link>: {tweet.tweet}</div>
            ))}
            </div> : <h1>Loading</h1>}
        </div>
    )
}

export default Feed;
