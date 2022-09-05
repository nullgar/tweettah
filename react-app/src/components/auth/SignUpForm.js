import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

//   useEffect(() => {
//     if (username.length > 0) {
//         const placeholder = document.querySelector('#username');
//         placeholder?.setAttribute('class', 'signup-form-place-holder-focused');
//     } else {
//         const placeholder = document.querySelector('#username');
//         placeholder?.setAttribute('class', 'signup-form-place-holder');
//     }

//   }, [username])


  const onSignUp = async (e) => {
    e.preventDefault();
    console.log('signup fire off', username, email, password)
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };



  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-modal-master-div'>


      <div className='signup-modal-inner-div'>
        <h2>Create your account</h2>
        <form className='signup-modal-form' onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <div
            id='username'
            className={'signup-form-place-holder'}
            hidden={!username}

            >User Name</div>
            <input
              className='signup-form-input'
              type='text'
              placeholder='User Name'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <div
            className='signup-form-place-holder'
            hidden={!email}
            >Email</div>
            <input
              className='signup-form-input'
              type='text'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <div
            className='signup-form-place-holder'
            hidden={!password}
            >Password</div>
            <input
              className='signup-form-input'
              type='password'
              placeholder='Password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <div
            className='signup-form-place-holder'
            hidden={!repeatPassword}
            >Repeat Password</div>
            <input
              className='signup-form-input'
              type='password'
              placeholder='Repeat Password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button className='signup-button' type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
