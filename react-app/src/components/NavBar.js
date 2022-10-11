
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
// import LoginFormModal from './LoginFormModal';
import './NavBar.css'
const NavBar = () => {
  const curret_user = useSelector(state => state.session.user.id)
  return (
    <div className='over-div'>
    <div className='navbar-master'>
      <div className='nav-bar-main-div'>
        <NavLink className='nav-bar-link' to='/' exact={true} activeClassName='active'>
          <div className='icon-nav-bar'>
          </div>
        </NavLink>
        {/* <div className='nav-bar-divs'> */}
          {/* <NavLink className='nav-bar-link' to='/' exact={true} activeClassName='active'>
          <i className="fa-solid fa-house-user icon">  </i>
          <p className='ip'>Home</p>
          </NavLink> */}
        {/* </div > */}
        {/* <div className='nav-bar-divs'>
          <NavLink className='nav-bar-link' to={`/${curret_user}`} exact={true}>
          <i className="fa-solid fa-user icon"></i>
          User Profile
          </NavLink>
        </div> */}
        <div className='nav-bar-divs'>
          <NavLink className='nav-bar-link' to='/' exact={true} activeClassName='active'>
            <i className="fa-solid fa-house-user icon">  </i>
            <p className='ip'>Home</p>
          </NavLink>
          <NavLink className='nav-bar-link' to={`/${curret_user}`}>
            <i className="fa-solid fa-user icon"></i>
            <p className='ip'>User Profile</p>
          </NavLink>

          <LogoutButton />
        </div>
      </div>

    </div>
    {/* <div className='nav-user-profile-div'>
      <p>User Profile</p>
    </div> */}
    </div>
  );
}

export default NavBar;
