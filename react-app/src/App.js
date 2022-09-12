import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import Feed from './components/Feed';
import SeeTweet from './components/SeeTweet';
import SignUp from './components/auth/SignUp';
import BottomBar from './components/BottomBar/BottomBar';
import Page404 from './components/404';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.session.user);
  // console.log(userAuth)
  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      {userAuth ? <NavBar /> : null}
      <Switch>
        <Route path='/sign-up' bounces={false} exact={true}>
          <SignUp />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <Feed />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path='/:userId/:tweetId' exact={true} >
          <SeeTweet />
        </ProtectedRoute>

        <ProtectedRoute>
          <Page404/>
        </ProtectedRoute>
      </Switch>
      {userAuth ? <BottomBar /> : null}
    </BrowserRouter>
  );
}

export default App;
