import React, { useState } from 'react';
import AboutLinks from './AboutLinks';
import './BottomBar.css'
import FollowBox from './FollowBox';

const BottomBar = () => {



  return (
    <div className='bottom-bar-div'>
        {/* <FollowBox /> */}
        <AboutLinks />
    </div>
  );
};

export default BottomBar;
