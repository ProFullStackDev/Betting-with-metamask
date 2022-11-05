import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css'
import { useMediaQuery } from "react-responsive";

export default function Homepage() {
  const navigate = useNavigate();
  let isLaptopOrMobile = useMediaQuery({
    minWidth: 599,
  });
  return (
    <div className='homepage'>
      <div className='homepage-container'>
        <div className='image-button-group'>
          {
            (isLaptopOrMobile) ?
              (<div className='row-justify-center'>
                <div className='how-to-play' onClick={() => navigate('/howtoplay')}></div>
                <div className='play-now' onClick={() => navigate('/signup')}></div>
                <div className='rules' onClick={() => navigate('/rules')}></div>
              </div>)
              :
              (<div className='row-justify-center'>
                <div className='play-now' onClick={() => navigate('/signup')}></div>
                <div className='how-to-play' onClick={() => navigate('/howtoplay')}></div>
                <div className='rules' onClick={() => navigate('/rules')}></div>
              </div>)
          }
        </div>
      </div>
    </div>
  );
}
