import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUserTweets } from "../../store/tweets";
import EditTweet from "../EditTweet";
import './SeeTweet.css'


const SeeTweet = () => {
    const {userId, tweetId} = useParams()
    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(false)
    // const [tweet, setTweet] = useState({})
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const tweets = useSelector(state => state.tweets)
    const tweet = tweets[tweetId]


    useEffect(() => {

        dispatch(getSingleUserTweets(userId))
        const clear = setTimeout(() => {
            setLoaded(true)
        }, 150)

        return () => clearTimeout(clear)


    }, [])

    console.log(tweet)
    return (

        loaded && tweet ?
        // <div>
        //     User:{userId}  Tweet: {tweetId}
        //     <div>{tweet.tweet}</div>
        //     {tweet.user_id == user.id ? <EditTweet tweet={tweet}/> : null}

        // </div>
        <>
        <div className="see-tweet-master-div-1">
            <div className="see-tweet-info-div">
                <div className="see-tweat-image-div">
                    <img src={tweet.profile_pic} className='see-tweet-image' />
                </div>
                <div className="see-tweet-info-inner-div">
                    <span>{tweet.username}</span>
                    <span>{`@${tweet.username}`}</span>
                </div>
            </div>
        </div>
        <div className="see-tweet-master-div-2">

            <div className="see-tweet-inner-div">
            <p className="see-tweet">{tweet.tweet}</p>

            {/* <p>{tweet.created_at.split(' ').slice(0, 4).join(' ')}</p> */}
            </div>
            <i
            onClick={e => setShow(!show)}
            className="fa-solid fa-ellipsis see-tweet-edit-icon"></i>
        </div>
        <div className="see-tweet-edit-div">
            {show && tweet.user_id == user.id ? <EditTweet tweet={tweet}/> : null}

        </div>
        </>
        : <h1>Loading</h1>
    )
}

export default SeeTweet;
