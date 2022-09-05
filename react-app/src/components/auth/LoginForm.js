import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    dispatch(login('goose@aa.io', 'password'));
  }
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to='/' />;
  // }

  return (
    <div className='login-modal-master-div'>
      <div className='login-modal-inner-div'>


        <h2>Log In</h2>
        <form className='login-modal-form' onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <div
            className='login-form-place-holder'
            htmlFor='email'
            hidden={!email}
            >Email</div>
            <input
              name='email'
              type='text'
              className='login-form-input'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <div
            className='login-form-place-holder'
            htmlFor='password'
            hidden={!password}
            >Password</div>
            <input
              name='password'
              type='password'
              className='login-form-input'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button className='login-button' onClick={handleDemoUser}>Demo User</button>
          <button className='login-button' type='submit'>Login</button>
        </form>
        </div>
    </div>
  );
};

export default LoginForm;
