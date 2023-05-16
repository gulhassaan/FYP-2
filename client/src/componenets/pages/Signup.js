import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import Navbar from "./NavbarLogin";
import pin from "../images/pin1.png";
import email1 from '../images/email1.png'
import phone1 from '../images/phone1.png'
import password1 from '../images/password1.png'
import user1 from '../images/user.png'
import "@fontsource/montserrat";
import imag2 from '../images/login3.jpg';
import emailjs from "@emailjs/browser";
function Signup() {
  //  const [user, setUser] = useState("");
  // const [password, setPassword] = useState("");
  //const [cpassword, setcPassword] = useState("");
  //const [number, setNumber] = useState("");

  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [Cpassword, setCPass] = useState('');
  const [name, setName] = useState('');
  const [contact_number, setcontact] = useState('');
  const [err, seterr] = useState('')
  const navigate = useNavigate();
  const [checkEmail, setCheck] = useState("")
  const form = useRef();

  const [errN, seterrN] = useState(false)
  const [errP, seterrP] = useState(false)
  const [errCP, seterrCP] = useState(false)
  const [errE, seterrE] = useState(false)
  const [errCN, seterrCN] = useState(false)
  const [otp, setotp] = useState("");

  const [checkotp, setcheckotp] = useState(false)


  const otpgenerator = () => {
    var arr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var ans = "";
    for (var i = 0; i < 6; i++) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    //console.log(ans);
    return ans;
  };
  const [otp_generated, setotp_generated] = useState(otpgenerator());


  const sendEmail = (e) => {
    e.preventDefault();

    console.log("sending");
    console.log(otp_generated);
    emailjs.sendForm(
      "service_5oubeuc",
      "template_keoih78",
      form.current,
      "g-C1asTIT73OcGBU9"
    ).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
    seterrE(false)
  }







  const register = () => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    Axios.post("http://localhost:3006/getEmail", {
      email: email,
    }).then((response) => {
      console.log("HELO  : ", response.data)
      setCheck(response.data)
    })




    if (name === "") {
      seterrN(true)
    }
    else if (email === "") {
      seterrE(true)
      seterr("Email is Required")
    }

    else if (!regex.test(email)) {
      seterrE(true)
      seterr("Invalid Email")
    }
    else if (checkEmail === "already") {
      seterrE(true)
      seterr("Email Already Exist")
    }
    else if (contact_number.length < 11 && /^\d+$/.test(contact_number) === false) {
      seterrCN(true)
    }
    else if (password.length < 8) {
      seterrP(true)
    }
    else if (password != Cpassword) {
      seterrCP(true)
    }
    else {
      seterrP(false)
      seterr("")
      seterrN(false)
      seterrCN(false)
      seterrCP(false)
      setotp_generated(otpgenerator());
      seterrP(false);
      Axios.post("http://localhost:3006/register", {

        name: name,
        password: password,
        contact_number: contact_number,
        email: email,

      }).then((response) => {
        console.log(response);
      })
      navigate('/signupsuccess')
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }


  const EmailHandler = (e) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    setEmail(e.target.value)
    setotp_generated(otpgenerator());
    Axios.post("http://localhost:3006/getEmail", {
      email: e.target.vaue,
    }).then((response) => {
      console.log("HELO  : ", response.data)
      setCheck(response.data)
    })


    if (e.target.value === "") {
      seterrP(true)
      seterr("Email is Required")
    }
    else if (!regex.test(e.target.value)) {
      seterrE(true)
      seterr("Invalid Email")
    }
    else if (checkEmail === "already") {
      seterrE(true)
      seterr("Email Already Exist")
    }
    else {
      seterrE(false)
    }
  }

  const passHandler = (e) => {

    setPass(e.target.value)
    if (e.target.value.length < 8) {
      seterrP(true)
    }
    else {
      seterrP(false)
    }
  }

  const nameHandler = (e) => {

    setName(e.target.value)
    if (e.target.value == "") {
      seterrN(true)
    }
    else {
      seterrN(false)
    }

  }

  const otpHandler = (e) => {
    setotp(e.target.value)
    if (e.target.value === otp_generated) {
      setotp_generated(otpgenerator());
      setcheckotp(false)
    } else {
      setcheckotp(false)
    }


  }

  const contactHandler = (e) => {


    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (re.test(e.target.value) && e.target.value.length <= 11) {
      setcontact(e.target.value);
      seterrCN(true)
    } else {
      seterrCN(false)
    }


  }

  const CpassHandler = (e) => {

    setCPass(e.target.value)
    if (e.target.value === "") {
      seterrCP(true)
    }
    else if (password !== e.target.value) {
      seterrCP(true)
    }
    else {
      seterrCP(false)
    }


  }



  useEffect(() => {
    if (localStorage.getItem('email_token')) {
      navigate('/home')
    }
  }, [])
  return (
    <div>
      <div>
        <Navbar />
        <div className='Login-banner'>
          <div className="overlaybg2"></div>
          <img className="img1" src={imag2}></img>
          <div className='ContentLanding'>
            <section className="signup">
              <div className="conatiner mt-5">
                <div className="signup-content">
                  <div className="signup-form">
                    <h2 className="form-title">Sign Up</h2>
                    <form
                      className="register-form"
                      id="register-form"
                      ref={form}
                      onSubmit={handleSubmit}
                    >
                      <div className="otpsignup">
                        <label for="full-name" htmlFor="full-name">
                          <img className="pass-icon" src={user1}></img>
                        </label>
                        <input
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color: "#ffffff" }}
                          type="name"
                          name="name"
                          id="name"
                          placeholder="Full Name"
                          onChange={nameHandler}

                        ></input>

                      </div>
                      {
                        errN ? <span style={{ color: "#00ffff" }}>Name Is Required</span> : ""
                      }
                      <div className="signup-email">
                        <label htmlFor="email">
                          <img className="pass-icon" src={email1}></img>
                        </label>
                        <input
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color: "#ffffff" }}
                          type=""
                          name="email"
                          id="email"
                          placeholder="Email"
                          onChange={EmailHandler}

                        ></input>
                        <input
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color: "#ffffff" }}
                          type="hidden"
                          name="otpg"
                          id="otpg"

                          value={otp_generated}

                        ></input>
                        <button class="OTPsignup-btn" onClick={sendEmail}>Get OTP</button>
                      </div>
                      {
                        errE ? <span style={{ color: "#00ffff" }}>{err}</span> : ""
                      }
                      <div className="otpsignup">
                        <label htmlFor="password">
                          <img className="pass-icon" src={pin}></img>
                        </label>
                        <input
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color: "#ffffff" }}
                          type="pin"
                          name="pin"
                          id="signup-pin"
                          placeholder="Confirmation Pin"
                          onChange={otpHandler}
                          autoComplete="off"
                        ></input>
                      </div>
                      {
                        checkotp ? <span style={{ color: "#00ffff" }}>OTP NOT Match</span> : ""
                      }

                      <div className="form-group">
                        <label for="phone" htmlFor="phone">
                          <img className="pass-icon" src={phone1}></img>
                        </label>
                        <input
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color: "#ffffff" }}
                          type="tel"
                          name="phone"
                          id="phone"
                          placeholder="Phone(0333XXXXXXX)"
                          maxlength="12"
                          //pattern="[0-9]{4}-[0-9]{7}"
                          onChange={contactHandler}
                          value={contact_number}
                          autoComplete="off"
                        ></input>

                      </div>

                      {
                        errCN ? <span style={{ color: "#00ffff" }}>Invalid Contact Number</span> : ""
                      }
                      <div className="form-group">
                        <label htmlFor="password">
                          <img className="pass-icon" src={password1}></img>
                        </label>
                        <input
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color: "#ffffff" }}
                          type="password"
                          name="passwrod"
                          id="password"
                          placeholder="Password"
                          onChange={passHandler}

                          autoComplete="off"
                        ></input>

                      </div>
                      {
                        errP ? <span style={{ color: "#00ffff" }}>Password must be greater then 8</span> : ""
                      }
                      <div className="form-group">
                        <label htmlFor="cpassword">
                          <img className="pass-icon" src={password1}></img>
                        </label>
                        <input
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color: "#ffffff" }}
                          type="password"
                          name="cpasswrod"
                          id="cpassword"
                          placeholder=" Confirm Password"
                          onChange={CpassHandler}

                        ></input>

                      </div>
                      {
                        errCP ? <span style={{ color: "#00ffff" }}>Password Desn't Match</span> : ""
                      }
                      <div className="form-submit">
                        <button className="register-btn" type="submit" onClick={register}>Register</button>
                        <hr color="white"></hr>
                        <div className="login-footerbtn">
                          Already have an account?
                          <Link to="/login" className="signup-image-link">

                            Login
                          </Link>
                        </div>
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

export default Signup;

