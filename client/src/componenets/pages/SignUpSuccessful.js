import React, { useEffect } from "react";
import './App.css';
import { NavLink, useNavigate } from "react-router-dom";
import upd from '../images/updated.png';
import "@fontsource/montserrat";
import imag2 from '../images/login3.jpg';
import Navbar from './Navbar';
function SignUpSuccessfully() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('email_token')) {
      navigate('/home')
    }
  }, [])
  const gologin = () => {
    navigate('/login')

  };
  return (
    <div>
      <div>
        <Navbar />
        <div className='Login-banner'>
          <div className="overlaybg2"></div>
          <img className="img1" src={imag2}></img>
          <div className='ContentLanding'>
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

                      <div className="login-image">
                        <button className="to_login" onClick={gologin}>
                          Login

                        </button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpSuccessfully;