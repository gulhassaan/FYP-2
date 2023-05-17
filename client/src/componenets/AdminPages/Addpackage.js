import React, { useState, useEffect } from 'react'
import "../pages/App.css";
import Axios from 'axios'
import add from '../images/addpackage.png';
import det from '../images/details.png';
import pri from '../images/price.png';
import { NavLink, useNavigate } from 'react-router-dom';
import ad1 from '../images/addpackage1.png';
import Navbar from './Navbar2';
import arrow from '../images/arrow.png'
function Addpackage() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [errT, seterrT] = useState(false)
  const [errD, seterrD] = useState(false)
  const [errP, seterrP] = useState(false)


  const navigate = useNavigate();


  const publish = () => {

    if (title === "") {
      seterrT(true)
    }
    else if (description === "") {
      seterrD(true)
    }
    else if (price === "") {
      seterrP(true)
    }
    else {
      Axios.post("http://localhost:3006/publish_package", { title: title, description: description, price: price }).then((response) => {
        console.log(response.data);
      })
      navigate('/managead')
      seterrD(false);
      seterrP(false);
      seterrT(false);
    }

  }

  const priceHandle = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "") {
      seterrP(true)
    }
    else {
      seterrP(false)
    } if (e.target.value === "" || re.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  const titleHandle = (e) => {
    if (e.target.value === "") {
      seterrT(true)
    }
    else {
      setTitle(e.target.value)
      seterrT(false)

    }
  };

  const DesHandle = (e) => {
    
    if (e.target.value === "") {
      seterrD(true)
    }
    else {
      seterrD(false)
      const temp = e.target.value;
      setDescription(temp);
    }
  
  }
  const handleSubmit = (e) => {
    e.preventDefault();


  }

  useEffect(() => {
    if (!localStorage.getItem('Adminemail')) {
      navigate('/Adminlogin')
    }
  }, [])


  return (
    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
    <div>
    <Navbar/>
    
    <section className="Add-package">
      <div className="conatiner mt-5">
        <div className="Add-package-content">
          <div className="signin-form">
          <a href="/managead">
                    <img className="adpackage-icon" src={arrow} alt=""></img>
                  </a>
            <img class="addpackage-add" src={ad1}></img>
            <h2 className="addproduct-title">Add Package</h2>
            <form
              className="register-form"
              id="register-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">
                <label htmlFor="">
                  <img className='pass-icon' src={add}></img>
                </label>
                <input
                style={{ backgroundColor: '#FFFFFF' }}
                  type="name"
                  name="password"
                  id="addpackage"
                  placeholder="Package Name"
                  onChange={titleHandle}
                ></input>
                <p>{errT}</p>
            
              </div>
              {
                errT ? <span style={{ color: "red" }}>Title Is Required</span> : ""
              }
             

              <div className="form-group">
                <label htmlFor="password">
                  <img className="pass-icon" src={pri}></img>
                </label>
                <input
                style={{ backgroundColor: '#FFFFFF' }}
                value={price}
                  type="pin"
                  name="pin"
                  id="addpackage"
                  placeholder="RS | "
                  onChange={priceHandle}
                  autoComplete="off"
                ></input>
              
              </div>
              {
                errP ? <span style={{ color: "red" }}>Price Is Required</span> : ""
              }
 <div className="form-group">
                <label htmlFor="password">
                  <img className="pass-icon" src={det}></img>
                </label>
                <input
                style={{ backgroundColor: '#FFFFFF' }}
                  type="pin"
                  name="pin"
                  id="addpackage"
                  placeholder="Details"
                  autoComplete="off"
                  onChange={DesHandle}
                ></input>
               
              </div>
              {
                errD ? <span style={{ color: "red" }}>Description Is Required</span> : ""
              }
              <div className="signin-image">
                <button type="submit" className="updatepkg-btn" onClick={publish}>
                  Add
                </button>

              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
    </div>
    </div>
  )
}

export default Addpackage