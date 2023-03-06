/*import React from 'react';




import {Link} from 'react-router-dom';
import './App.css';
import { FaHeart } from "react-icons/fa";
import logo1 from '../images/logo.png';
function Navbar(){
return(

    <nav class="navbar navbar-expand-lg ">
  <div class="container-fluid" >


   <img className='logo1' id='logo1' src={logo1} alt="" />
   
   <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        
        
  

        <li class="nav-item1">
        <Link to="/home"  class="nav-link active "> <b>Home</b>  </Link>
        </li>
        <li class="nav-item2">
        <Link to="/home"  class="nav-link active ">  <b>ADs</b></Link>
        </li>
        <li class="nav-item3">
        <Link to="/about"  class="nav-link active"> <b>About Us</b> </Link>
        </li>
        <li class="nav-item3">
        <Link to="/contact"  class="nav-link active">  <b>Contact Us</b> </Link>
        </li>
      </ul>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        
        
  

        <li class="nav-item11">
        <Link to="/sell"  class="nav-link active"> <b>Sell</b>  </Link>
        </li>
        <li class="nav-item22">
        <Link to="/login"  class="nav-link active ">  <b>Login</b></Link>
        </li>
        <li class="nav-item33">
        <Link to="/signup"  class="nav-link active"> <b>Signup</b> </Link>
        </li>
        
      </ul>
     
    </div>
  </div>
</nav>

);
}

export default Navbar;*/


import React, { useState } from "react";
import './App.css';
import logo1 from '../images/logo.png';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
<img className="logo1-nav" src={logo1}></img>
<div className="nav-items1">
<a href="/landingpage"><b>Home</b> </a>
        <a href="/login"> <b>My Ads</b> </a>
        <a href="/service"><b>About Us</b> </a>
        
</div>
        <div className={`nav-items ${isOpen && "open"}`}style={{marginLeft:"auto"}}>
        
        
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

export default Navbar;