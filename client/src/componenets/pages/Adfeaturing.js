import React, { useState } from 'react';
import NavbarS from './Navbar';
import "./Adfeaturing.css";

const Adfeaturing = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePackageSelect = (packageName) => {
    setSelectedPackage(packageName);
  };

  return (
    <div>
    <NavbarS/>
      <div className="container">
        <div className="heading">
          Reach more buyers and sell faster<br></br>
          <p className='p'>Upgrade your ad at top position</p>
        </div>
        <div className="title">
          Feature Ad
        </div>
        <div
          className={`package ${selectedPackage === "Silver Package" ? "selected" : ""}`}
          onClick={() => handlePackageSelect("Silver Package")}
        >
          <div className="check-mark">{selectedPackage === "Silver Package" && "✓"}</div>
          <div className="package-name">
            Silver Package
          </div>
          <div className="package-details">
            Feature 1 ad for 10 days
          </div>
          <div className="package-price">
            Price 10,000
          </div>
        </div>
        <div
          className={`package ${selectedPackage === "Gold Package" ? "selected" : ""}`}
          onClick={() => handlePackageSelect("Gold Package")}
        >
          <div className="check-mark">{selectedPackage === "Gold Package" && "✓"}</div>
          <div className="package-name">
            Gold Package
          </div>
          <div className="package-details">
            Feature 1 ad for 10 days
          </div>
          <div className="package-price">
            Price 10,000
          </div>
        </div>
        <div
          className={`package ${selectedPackage === "Platinum Package" ? "selected" : ""}`}
          onClick={() => handlePackageSelect("Platinum Package")}
        >
          <div className="check-mark">{selectedPackage === "Platinum Package" && "✓"}</div>
          <div className="package-name">
            Platinum Package
          </div>
          <div className="package-details">
            Feature 1 ad for 10 days
          </div>
          <div className="package-price">
            Price 10,000
          </div>
        </div>
        <div className="post-now-button">
          Post now
        </div>
      </div>
    </div>
  );
};

export default Adfeaturing;
