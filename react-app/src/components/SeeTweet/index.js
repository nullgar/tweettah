import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleUserTweets } from "../../store/tweets";
import Page404 from "../404";
import CreateComment from "../CreateComment";
import EditTweetModal from "../EditTweetModal";
// import EditTweet from "../EditTweet";
import SeeComments from "../SeeComments";
import Spinner from "../Spinner";
import './SeeTweet.css'


const SeeTweet = () => {
    const {userId, tweetId} = useParams()
    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(false)
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    // const [tweet, setTweet] = useState({})
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const tweet = useSelector(state => state.tweets[tweetId])
    // const tweet = tweets[tweetId]



    useEffect(() => {
        dispatch(getSingleUserTweets(userId))
        const clear = setTimeout(() => {
            setLoaded(true)
          }, 1000)

        return () => clearTimeout(clear)

    }, [dispatch])

    // if (!tweet) history.push('/404')
    if (loaded && userId && !tweet) {
        return <Page404 />
      }
    // console.log(tweet)
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
            onClick={e => setShowModal(!showModal)}
            className="fa-solid fa-ellipsis see-tweet-edit-icon">
            </i> : null}
        </div>
        <div className="see-tweet-edit-div">
            {/* {show && tweet.user_id === user.id ? <EditTweet setShow={setShow} tweet={tweet}/> : null} */}
            {tweet.user_id === user.id ? <EditTweetModal setShowModal={setShowModal} showModal={showModal} tweet={tweet}/> : null}

        </div>
        <CreateComment tweetId={tweetId}/>
        <SeeComments tweetId={tweetId} comments={tweet.comments} />
        </div>
        : <div className="spinner-container"><Spinner /></div>
    )
}

export default SeeTweet;
