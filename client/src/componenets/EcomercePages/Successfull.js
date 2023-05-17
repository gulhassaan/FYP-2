import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarS from './NavbarS';
import './Successfull.css';

const Successfull = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
    navigate('/storehome');
  };

  return (
    <div>
      <NavbarS />
      <div className="successfull-container">
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Thank You for Your Purchase!</h2>
              <p>We appreciate your business and hope you enjoy your new gaming items.</p>
              <button className="close-button" onClick={handleBackButton}>Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Successfull;