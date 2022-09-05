import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFromModal';
import './SignUp.css'

const SignUp = () => {

  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-master-div'>

      <div className='signup-logo-div'>Logo</div>
      <div>
        <button onClick={() => setShowModal(true)}>Sign Up</button>
        <SignUpFormModal showModal={showModal} setShowModal={setShowModal} />
        <LoginFormModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default SignUp;
