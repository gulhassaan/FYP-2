import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarS from '../EcomercePages/NavbarS';
import '../EcomercePages/Successfull.css';
import imag2 from '../images/login10.jpg';
const Success = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);


  const closePopup = () => {
    setShowPopup(false);
    navigate('/storehome');
  };

  return (
    <div>
      <NavbarS />
      <div className='Login-banner'>
        <div className="overlaybg1"></div>
        <img className="img1" src={imag2}></img>
        <div className='ContentLanding'>
      <div className="successfull-container">
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Thank You for Your Purchase!</h2>
              <p>We appreciate your business and hope you enjoy this product.</p>
              <button className="close-button" onClick={closePopup}>Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Success;