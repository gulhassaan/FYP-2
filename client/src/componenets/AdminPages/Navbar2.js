
import React, { useState } from "react";
import "../pages/App.css";
import logo1 from '../images/logo.png';
const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
<img className="logo1-nav" src={logo1}></img>
<div className="nav-items1">       
        <a href="/manageusersads"><b>Ads</b> </a>
        <a href="/manageusers"><b>User</b> </a>
        <a href="/managestore"><b>E-commerce Store</b> </a>
        <a href="/managead"><b>Ad Featuring Package</b> </a>
        <a href="/userreq"><b>User Authentication</b> </a>
</div>
<a className="admin-logout-btn" onClick={() => {
  localStorage.removeItem('Adminemail')
 }} href="/adminlogin"><b>Log Out</b></a>
        <div className={`n ${isOpen && "open"}`}>
        <a href="/sell"> <b></b></a>
        <a href="/login"> <b></b></a>
        <a href="/signup"><b></b></a>
        
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