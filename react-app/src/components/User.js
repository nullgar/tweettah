import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getSingleUserTweets } from '../store/tweets';

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
    }, 150)

    return () => clearTimeout(clear)


  }, [dispatch, userId]);

  if (!user) {
    return null;
  }

  return (
    loaded && user && tweets ?
    <div>
        <div className='user-info'>
          <div>
            <img src={user.profile_pic} />
          </div>
          <p>Username</p> {user.username}
          <p>Email</p> {user.email}
        </div>
        <div className='tweet-container'>

          {Object.values(tweets).map(tweet => (
            <div key={tweet.id}>
              <Link to={`/${user.id}/${tweet.id}`}>{tweet.tweet}</Link>
              </div>
            ))}
        </div>
    </div>
    : <h1>Loading</h1>
  );
}
export default User;
