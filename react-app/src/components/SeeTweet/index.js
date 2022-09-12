import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUserTweets } from "../../store/tweets";
import Page404 from "../404";
import CreateComment from "../CreateComment";
import EditTweet from "../EditTweet";
import SeeComments from "../SeeComments";
import Spinner from "../Spinner";
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
        }, 1000)

        return () => clearTimeout(clear)


    }, [dispatch])


    return (

        loaded && tweet ?
        <div className="top-div">
        <div className="see-tweet-master-div-1">
            <div className="see-tweet-info-div">
                <div className="see-tweat-image-div">
                    <img src={tweet.profile_pic} className='see-tweet-image' alt="" />
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

            {tweet.user_id === user.id ? <i
            onClick={e => setShow(!show)}
            className="fa-solid fa-ellipsis see-tweet-edit-icon">
            </i> : null}
        </div>
        <div className="see-tweet-edit-div">
            {show && tweet.user_id === user.id ? <EditTweet setShow={setShow} tweet={tweet}/> : null}

        </div>
        <CreateComment tweetId={tweetId}/>
        <SeeComments tweetId={tweetId} />
        </div>
        : <div className="spinner-container"><Page404/></div>
    )
}

export default SeeTweet;
