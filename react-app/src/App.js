import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Feed from './components/Feed';
import CreateTweet from './components/CreateTweet';
import SeeTweet from './components/SeeTweet';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

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
      <NavBar />
      <Switch>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/login' exact={true}>
          {/* <LoginFormModal /> */}
          <LoginForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        <ProtectedRoute path='/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/:userId/:tweetId' exact={true} >
          <SeeTweet />
        </ProtectedRoute>

        <ProtectedRoute path='/' exact={true} >
          <Feed />
        </ProtectedRoute>
        <ProtectedRoute path='/new' exact={true}>
          <CreateTweet />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
