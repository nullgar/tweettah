import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUserTweets } from "../../store/tweets";
import EditTweet from "../EditTweet";



const SeeTweet = () => {
    const {userId, tweetId} = useParams()
    const [loaded, setLoaded] = useState(false)
    // const [tweet, setTweet] = useState({})
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const tweets = useSelector(state => state.tweets)
    const tweet = tweets[tweetId]
    // const checkIfTweet = useSelector(state => state.tweets[tweetId])
    // console.log(user)
    useEffect(() => {

        dispatch(getSingleUserTweets(userId))
        const clear = setTimeout(() => {
            setLoaded(true)
        }, 150)

        return () => clearTimeout(clear)
            // (async () => {
            //     const response = await fetch(`/api/tweet/${userId}/${tweetId}`);
            //     // if (!response.ok) return history.push('/')
            //     const data = await response.json();
            //     setTweet(data)
            //     const clear = setTimeout(() => {
            //         setLoaded(true)
            //       }, 150)

            //     return () => clearTimeout(clear)

            // })();

    }, [])


    return (

        loaded && tweet ?
        <div>
            User:{userId}  Tweet: {tweetId}
            <div>{tweet.tweet}</div>
            {tweet.user_id == user.id ? <EditTweet tweet={tweet}/> : null}

        </div>

        : <h1>Loading</h1>
    )
}

export default SeeTweet;
