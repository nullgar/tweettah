import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
// import { signUp } from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import './SignUp.css'

const SignUp = () => {

  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-master-div'>

      <div className='signup-logo-div'></div>
      <div className='signup-second-div'>
        <p className='signup-main-title'>Happening now</p>
        <p className='signup-second-title'>Join Tweettah today.</p>
        <div className='signup-inner-div'>
          <SignUpFormModal showModal={showModal} setShowModal={setShowModal} />
          <LoginFormModal showModal={showModal} setShowModal={setShowModal} />

        </div>
      </div>
    </div>
  );
};

export default SignUp;
