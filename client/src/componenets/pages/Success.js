import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarS from '../EcomercePages/NavbarS';
import '../EcomercePages/Successfull.css';
import imag2 from '../images/login10.jpg';
const Success = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  const handleBackButton = () => {
    navigate('/profile');
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate('/profile');
  };

  return (
    <div>
      <NavbarS />
      <div className="successfull-container">
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Thank You for Your Purchase!</h2>
              <p>We appreciate your business and hope your Product Sold as soon as Possible.</p>
              <button className="close-button" onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
        <button className="back-button" onClick={handleBackButton}>Back</button>
      </div>
    </div>
  );
};

export default Success;