import React, { useEffect } from "react";
import './App.css';
import { NavLink, useNavigate } from "react-router-dom";
import upd from '../images/updated.png';
import Navbar from './Navbar';
function SignUpSuccessfully() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('email_token')) {
      navigate('/home')
    }
  }, [])
  return (
    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
      <div>
        <Navbar />

        <section className="Forgot">
          <div className="conatiner mt-5">
            <div className="signupsuccess-content">
              <div className="signin-form">
                <h2 className="form-title">Sign Up Successfully</h2>
                <form
                  className="register-form"
                  id="register-form"
                >
                  <img className="updated-pg" src={upd}></img>
                  <p className="txt"> You have been registered Successfully!</p>

                  <div className="signin-image">
                    <button className="forgot-btn">
                      <NavLink to="/login" className="signup-image-link1">
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
    </div>
  );
}
export default SignUpSuccessfully;