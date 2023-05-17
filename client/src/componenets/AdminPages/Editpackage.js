import React ,{useState, useContext, useEffect } from 'react';
import "../pages/App.css";
import Axios from 'axios'
import add from '../images/addpackage.png';
import det from '../images/details.png';
import pri from '../images/price.png';
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import edi from '../images/editpackage.png';
import { AdFContext } from '../../App';
import Navbar from './Navbar2';
import arrow from '../images/arrow.png'
function Editpackage() {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
const navigate = useNavigate();
const [errT, seterrT] = useState(false)
const [errD, seterrD] = useState(false)
const [errP, seterrP] = useState(false)


  const { AdFID } = useContext(AdFContext);
  useEffect(() => {
    Axios.get(`http://localhost:3006/get_AdPackage/${AdFID}`).then((response) => {
      setTitle(response.data[0].Title);
      setDescription(response.data[0].Description);
      setPrice(response.data[0].Price);
  })
  }, []);

 

  const update = () => {

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
      Axios.put(`http://localhost:3006/update_AdPackage/${AdFID}`, { title: title, description: description, price: price }).then((response) => {
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
    setTitle(e.target.value)
    if (e.target.value === "") {
      seterrT(true)
    }
    else {
      setTitle(e.target.value)
      seterrT(false)

    }
  };

  const DesHandle = (e) => {
    setDescription(e.target.value);
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
    <div>
    <Navbar />
    
    <section className="Add-package">
    
    <div className="conatiner mt-5">
    
      <div className="Add-package-content">
        <div className="signin-form">
        <a href="/managead">
                    <img className="adpackage-icon" src={arrow} alt=""></img>
                  </a>
          <img class="addpackage-add" src={edi}></img>
          <h2 className="addproduct-title">Edit Package</h2>
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
                type="title"
                name="password"
                id="password"
                placeholder="Package Name"
                value={title}
            onChange={titleHandle}
                ></input>
              
            </div>

            {
              errT ? <span style={{ color: "red" }}>Title Is Required</span> : ""
            }

            <div className="form-group">
                  <label htmlFor="password">
                    <img className="pass-icon" src={det}></img>
                  </label>
                  <input
                  style={{ backgroundColor: '#FFFFFF' }}
                    type="Description"
                    name="pin"
                    id="pin"
                    placeholder="Details"
                    value={description}
                    onChange={DesHandle}
                    autoComplete="off"
                  ></input>
                </div>
           
               {
                errD ? <span style={{ color: "red" }}>Description Is Required</span> : ""
              }
                <div className="form-group">
                  <label htmlFor="password">
                    <img className="pass-icon" src={pri}></img>
                  </label>
                  <input
                  style={{ backgroundColor: '#FFFFFF' }}
                    type="pin"
                    name="pin"
                    id="pin"
                    value={price}
                    placeholder="Price"
                    onChange={priceHandle}
                    autoComplete="off"
                  ></input>
                </div>
           
                {
                  errP ? <span style={{ color: "red" }}>Price Is Required</span> : ""
                }
  
            <div className="signin-image">
           
              <button type="submit" className="updatepkg-btn" onClick={update}>
            Update
          </button>
               
               </div>
          </form>
          
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Editpackage