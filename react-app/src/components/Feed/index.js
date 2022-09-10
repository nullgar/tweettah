import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsersFeedTweets } from "../../store/tweets";
import CreateCommentModal from "../CreateCommentModal";
import CreateTweet from "../CreateTweet";
import LoadingSpinner from "../Spinner";
import './Feed.css'
const Feed = () => {
    const dispatch = useDispatch()
    const tweets = useSelector(state => state.tweets)
    const [tweetId, setTweetId] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        dispatch(getAllUsersFeedTweets())
        const clear = setTimeout(() => {
            setLoaded(true)
          }, 1000)

        return () => clearTimeout(clear)
    }, [dispatch, tweetId])


    return (
        <div>

            <CreateTweet />
            {loaded ? <div className="feed-master-div">
            {Object.values(tweets).reverse().map(tweet => (
                <div className="feed-inner-div" key={tweet.id}>
                    <div className="feed-top-div">
                        <div className="feed-user-image-div">
                            <img className="feed-user-image" src={tweet.profile_pic} />
                        </div>
                        <div className="feed-user-info">
                            <Link className="feed-user-link" to={`/${tweet.user_id}`}>{tweet.username}</Link>  <Link className="feed-user-handle" to={`/${tweet.user_id}`}>@{tweet.username}</Link>
                        </div>

                    </div>
                    <div  className="feed-user-tweet" >
                        <Link className="feed-user-tweet-link" to={`/${tweet.user_id}/${tweet.id}`}>
                            {tweet.tweet}
                        </Link>
                    </div>
                    <div className="feed-user-tweet-bottom-div">
                        <Link className="feed-user-tweet-link" to={`/${tweet.user_id}/${tweet.id}`}>
                            <i className="fa-regular fa-comment i-tag" onClick={() => {setTweetId(tweet.id); setShowModal(true)}} />
                            {/* <CreateCommentModal showModal={showModal} setShowModal={setShowModal} tweetId={tweetId} /> */}
                        </Link>
                        <Link className="feed-user-tweet-link" to={`/${tweet.user_id}/${tweet.id}`}>
                            {Object.values(tweet.comments).length}
                        </Link>
                    </div>

                    </div>
            ))}
            </div> : <LoadingSpinner />}
        </div>
    )
}

export default Feed;
