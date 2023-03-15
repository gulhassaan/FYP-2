
import React, { useState } from "react";
import './App.css';
import logo1 from '../images/logo.png';
import "@fontsource/montserrat";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
<img className="logo1-nav" src={logo1}></img>

       
      
    
     
    </div>
  );
};

export default Navbar1;