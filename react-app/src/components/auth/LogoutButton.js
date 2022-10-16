import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import './LogoutButton.css'
const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    < div className='logout-div' onClick={onLogout} >
    <NavLink to='#' className='nav-bar-link'>
      <i className='fa-solid fa-right-from-bracket logout-button' />
      <p className='ip'>Logout</p>
    </NavLink>
    </div>
  )

};

export default LogoutButton;
