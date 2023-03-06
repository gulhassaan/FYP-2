



import React, { useState, useContext,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import log from '../images/login.png'
import ema from '../images/email.png'
import Axios from 'axios';
import pas from '../images/password.png'



function AdminLogin(){
  //const [email, setEmail] = useState('');

  const [email, setEmail] = useState("")
  const [password, setPass] = useState('');

  const navigate = useNavigate();


  const [emailerr,setEmailerr] = useState(false)
  const [passerr,setPasserr] = useState(false)


  const [checkemail,setcheckE] = useState(false)
  const [checkpass,setcheckP] = useState(false)

  const [validation, setValidation] = useState({
    email: '',
    password: '',
  });

  let errors = validation;





  function login() 
  { 
    if(email!=="" && password!=="")
     {
      Axios.post("http://localhost:3006/login", {
        email: email,
        password: password,
      }).then((response) => {

        if (response.data === "Incorrect Email") {
          setcheckE(true);
          //errors.email = "Invalid Email and Password";
        setcheckP(false)
          //setlogin_S(0)
        }
        else if(response.data === "Incorrect Password")
        {
          setcheckE(false)
          setcheckP(true);
        }
        else if (response.data === "Login") {
          setcheckP(false);
          setcheckE(false);
          setEmailerr(false);
          setPasserr(false);
          
          localStorage.setItem("Adminemail", email)
        //  errors.email = 'Congratulation Successfully Login';
          { navigate('/managead') }
          //setlogin_S(1)
        }

      })
}
else{
  setEmailerr(true)
  setPasserr(true)
}
};

const EmailHandler=(e)=>{
  let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  setEmail(e.target.value)
if(e.target.value==="")
{
  setEmailerr(true)

}

else{
  setEmailerr(false)
}
}

const passHandler=(e)=>{

  setPass(e.target.value)
if(e.target.value=="")
{
  setPasserr(true)
}
else{
  setPasserr(false)
}


}


  const handleSubmit = (e) => {
    e.preventDefault();

  }
  useEffect(() => {
    if(localStorage.getItem('Adminemail'))
    {
      navigate('/managead')
    }
  }, [])
  return (
    <div>

      <section className="sign-in">
        <div className="conatiner mt-5">
          <div className="adminsignin-content">
            <div className="signin-form">
              <img src={log} />
              <h2 className="form-title">Admin Login</h2>
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
                
                </div>

               
            <button className="forgot-btn" type="submit" onClick={login}>Log In</button>


              </form>

              


              
            </div>
          </div>
        </div>
      </section>
    </div>

  )
} 
export default AdminLogin;