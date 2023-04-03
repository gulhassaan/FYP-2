import React, { useState } from "react";
import '../pages/App.css';
import logo1 from '../images/logo.png';
import chat from '../images/chat.png';
import bell from '../images/bell.png';
import account from '../images/account.png';
import drop from '../images/drop.png';
import "@fontsource/montserrat";
import cartimg from './images/addtocart.png';
const NavbarD = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
<img className="logo1-nav" src={logo1}></img>
<div className="nav-items1">
<a href="/home"><b>Home</b> </a>
        <a href="/myads"> <b>My Ads</b> </a>
        
        <a href="/storehome"><b>Gamingstan Store</b> </a>
        <a href="/about"><b>About Us</b> </a>
        
</div>
        <div className={`nav-items ${isOpen && "open"}`}style={{marginLeft:"auto"}}>
          
        <a href="/addtocart"><img className="pass-icon1" src={cartimg}></img></a>
      <a href=""><img className="pass-icon1" src={account}></img></a>
      <a className="ab" href="/hardware"><b>Sell</b></a>
      <a className="ab" onClick={() => {
        localStorage.removeItem('email_token')
       }} href="/landingpage"><b>Log Out</b></a>
       
    

      </div>
      
      
    
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar">
        </div>
      </div>
    </div>
  );
};

export default NavbarD;