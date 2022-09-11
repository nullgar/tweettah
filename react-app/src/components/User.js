import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getSingleUserTweets } from '../store/tweets';
import Spinner from './Spinner';
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const { userId }  = useParams();
  const tweets = useSelector(state => state.tweets)
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) return history.push('/')
      const user = await response.json();
      dispatch(getSingleUserTweets(userId))
      setUser(user);
    })();

    const clear = setTimeout(() => {
      setLoaded(true)
    }, 1000)

    return () => clearTimeout(clear)


  }, [dispatch, userId]);

  if (!user) {
    return null;
  }

  return (
    loaded && user && tweets ?
    <div className='user-profile-div'>
        <div className='user-info'>
          <div>
            <img className='user-profile-img' src={user.profile_pic} alt='' />
          </div>
          <p className='user-profile-p'>{user.username}</p>
          <p className='user-profile-2p'>@{user.username}</p>
        </div>
        <div className='tweet-container'>

          {Object.values(tweets).map(tweet => (
            <div className='one-tweet' key={tweet.id}>
              <div className='one-tweet-top'>
                <div className='user-profile-tweet-image-div'>
                  <img className='user-profile-tweet-image' src={tweet.profile_pic} alt='' />
                </div>
                <div className='user-tweet-link-div'>
                  <Link className='user-tweet-link' to={`/${user.id}/${tweet.id}`}>{tweet.tweet}</Link>
                </div>
              </div>
              <div className='one-tweet-bottom'>
                <div className='user-comment-div'>

                  <Link className="feed-user-tweet-link" to={`/${tweet.user_id}/${tweet.id}`}>
                    <i className="fa-regular fa-comment i-tag"  />
                  </Link>
                  <Link className="feed-user-tweet-link" to={`/${tweet.user_id}/${tweet.id}`}>
                    {Object.values(tweet.comments).length}
                  </Link>
                </div>
              </div>
            </div>
            ))}
        </div>
    </div>
    : <div className='user-spinner-container'><Spinner /></div>
  );
}
export default User;
