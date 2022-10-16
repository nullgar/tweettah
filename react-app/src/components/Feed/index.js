import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsersFeedTweets } from "../../store/tweets";
import CreateCommentModal from "../CreateCommentModal";
import CreateTweet from "../CreateTweet";
import EditTweetModal from "../EditTweetModal";
import Spinner from "../Spinner";
import LoadingSpinner from "../Spinner";
import './Feed.css'
const Feed = () => {
    const dispatch = useDispatch()
    const tweets = useSelector(state => state.tweets);
    const currentUser = useSelector(state => state.session.user);

    const [tweetToEdit, setTweetToEdit] = useState(null);
    const [mapping, setMapping] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [commentShowModal, setCommentShowModal] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [isFetched, setIsFetched] = useState(false)




    useEffect(() => {

        dispatch(getAllUsersFeedTweets());

        const fetch = async () =>  {

            setIsFetched(true)
        }
        fetch()

        const clear = setTimeout(() => {


            setLoaded(true);
          }, 1500)

        return () => clearTimeout(clear)
    }, [dispatch])



    return (
        <div className="feed-hidden-div">



            {tweets && isFetched && loaded ? <div className="feed-master-div">
            <CreateTweet />
            {Object.values(tweets).reverse().map(tweet => (
                <div className="feed-inner-div" key={tweet.id}>
                    <div className="feed-top-div">
                        <div className="feed-user-image-div">
                        <Link className="feed-user-link" to={`/${tweet.user_id}`}> <img className="feed-user-image" src={tweet.profile_pic} alt=''/> </Link>
                        </div>
                        <div className="feed-user-info">
                            <Link className="feed-user-link" to={`/${tweet.user_id}`}>{tweet.username}</Link>  <Link className="feed-user-handle" to={`/${tweet.user_id}`}>@{tweet.username}</Link>
                        </div>

                    </div>
                    <div  className="feed-user-tweet" >
                        <Link className="feed-user-tweet-link" to={`/${tweet.user_id}/${tweet.id}`}>
                            {tweet.images.length ? tweet.images.map((image) => (
                                <img loading="eager" className="tweet-image" key={image.id} src={image?.url} />
                            )): tweet.images.length === 0 ? null : <Spinner/>}

                            {tweet.tweet}
                        </Link>
                    </div>
                    <div className="feed-user-tweet-bottom-div">
                        <div>
                        {/* <Link className="feed-user-tweet-link" > */}
                            <i className="fa-regular fa-comment i-tag" onClick={() =>{
                                setCommentShowModal(!commentShowModal);
                                setTweetToEdit(tweet.id)
                            }}  />

                            <CreateCommentModal showModal={commentShowModal} setShowModal={setCommentShowModal} tweetId={tweetToEdit} />
                        {/* </Link> */}
                        {/* <Link className="feed-user-tweet-link" to={`/${tweet.user_id}/${tweet.id}`}> */}
                            {/* {Object.values(tweet.comments).length} */}
                            {Object.values(tweet.comments).length}
                        {/* </Link> */}
                        </div>

                        {currentUser.id === tweet.user_id ? <i onClick={e => {
                            setShowModal(!showModal)
                            setTweetToEdit(tweet)
                        }}
                        className="fa-solid fa-ellipsis feed-ellipsis">

                        </i> : null}
                        <EditTweetModal setShowModal={setShowModal} showModal={showModal} tweet={tweetToEdit}/>
                    </div>


                    </div>
            ))}
            </div> : <div className="feed-loading-div"><LoadingSpinner /></div>}
        </div>
    )
}

export default Feed;
