import React from "react";
import './App.css';
import { NavLink, useNavigate } from "react-router-dom";
import upd from '../images/updated.png';
import Navbar from './Navbar';
import useEffect from "react";
function Updated() {
  const navigate=useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('email_token'))
    {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <Navbar/>
    
  <section className="Forgot">
  <div className="conatiner mt-5">
    <div className="Forgot-content">
      <div className="signin-form">
        <h2 className="form-title">Password Updated</h2>
        <form
          className="register-form"
          id="register-form"
          >
      <img className="updated-pg" src={upd}></img>
          <p className="txt"> Your Password Has Been Updated!</p>
          
          <div className="signin-image">
            <button className="updated">
            <NavLink to="/login" className="signup-image-link">
                Login
              </NavLink>
        
            </button>
            </div>
        </form>
        
      </div>
    </div>
  </div>
</section>
</div>
  );
}
export default Updated;