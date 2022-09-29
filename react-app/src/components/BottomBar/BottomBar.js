import React from 'react';
import AboutLinks from './AboutLinks';
import './BottomBar.css'
import FollowBox from './FollowBox';

const BottomBar = () => {



  return (
    <div className='bottom-bar-div'>
        <AboutLinks />
        <FollowBox />
    </div>
  );
};

export default BottomBar;
