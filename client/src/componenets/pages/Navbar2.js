
import React, { useState } from "react";
import './App.css';
import logo1 from '../images/logo.png';
const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
<img className="logo1-nav" src={logo1}></img>
<div className="nav-items1">
<a href="/landingpage"><b>Home</b> </a>
        <a href="/login"> <b>My Ads</b> </a>
        <a href="/service"><b>About Us</b> </a>
    
</div>
        <div className={`nav-items ${isOpen && "open"}`}>
        <a href="/login"> <b>Sell</b></a>
        <a href="/login"> <b>Login</b></a>
        <a href="/signup"><b>Signup</b></a>
        
      </div>
      
    
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar2;