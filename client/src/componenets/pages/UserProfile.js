



import React, { useState, useContext,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import log from '../images/login.png'
import ema from '../images/email.png'
import Axios from 'axios';
import pas from '../images/password.png'
import './App.css'
import { EmailContext } from "../../App";
import Navbar from "./NavbarHome";
import "@fontsource/montserrat";

 
  useEffect(() => {
    if(localStorage.getItem('email_token'))
    {
      navigate('/home')
    }
  }, [])
  return (
    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
    <div>
      <Navbar />

      <section className="sign-in">
        <div className="conatiner mt-5">
          <div className="signin-content">
            <div className="signin-form">
              <img src={log} />
              <h2 className="form-title">My Profile</h2>
              <form
                className="register-form"
                id="register-form"
                onSubmit={handleSubmit}
              >

                <div className="login-inp">
                  <label htmlFor="email">
                    {/* <i class="zmdi zmdi-email"></i>*/}
                    <img className="pass-icon" src={ema}></img>
                  </label>

                  <input
                  style={{ backgroundColor: '#FFFFFF' }}
                    type="email"
                    name="email"
                    id="email"

                    placeholder="Email"
                    onChange={EmailHandler}
                    value={email}
                    autoComplete="on"
                  ></input>
              
                                  
                </div>
                {
                  emailerr?<span style={{color:"red"}}>Email Is Required</span>:""
                }
                <p className="error"> {errors.email} </p>
                <div className="login-inp">
                  <label htmlFor="password">
                    <img className="pass-icon" src={pas}></img>
                  </label>
                  <input
                  style={{ backgroundColor: '#FFFFFF' }}
                    type="password"
                    name="passwrod"
                    id="password"
                    placeholder="Password"
                    onChange={passHandler}
                    value={password}
                    autocomplete="on"               
                  ></input>
                
                </div>
                {
                  passerr?<span style={{color:"red"}}>Password is required</span>:""
                }
                <div className="login-forgotfooterbtn">
                {
                  checkemail?<span style={{color:"red",marginRight:"65px"}}>Invalid Email and Password</span>:""
                }
                {
                  checkpass?<span style={{color:"red",marginRight:"65px"}}>Invalid Password</span>:""
                }
                  <NavLink to="/forgotpassword" className="signup-image-link">
                    Forgot Password
                  </NavLink>
                
                </div>

               
            <button className="login-btn" type="submit" onClick={login}>Log In</button>


              </form>

              <hr></hr>


              <div className="login-footerbtn">
                Don't have an account?
                <NavLink to="/signup" className="signup-image-link">
                  SignUp
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>

  )
} 
