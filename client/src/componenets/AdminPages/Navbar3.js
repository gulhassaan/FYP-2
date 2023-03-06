
import React, { useState } from "react";
import "../pages/App.css";
import logo1 from '../images/logo.png';
import chat from '../images/chat.png';
import bell from '../images/bell.png';
import account from '../images/account.png';
const Navbar3 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
<img className="logo1-nav" src={logo1}></img>
<div className="nav-items1">
<a href="/home"><b>Admin</b> </a>
        <a href="/about"> <b>Ads</b> </a>
        <a href="/service"><b>About Us</b> </a>
        <a href="/contact"><b>Contact Us</b> </a>
</div>
        <div className={`nav-items ${isOpen && "open"}`}>
        <img className="pass-icon1" src={chat}></img>
        <img className="pass-icon1" src={bell}></img>
        <img className="pass-icon1" src={account}></img>
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

export default Navbar3;