import React, { Component, useContext, useEffect } from 'react'
import { useState } from 'react';
import Axios from 'axios'
import { Link, resolvePath, useNavigate } from "react-router-dom";
import { ImagesContext } from '../../App';
import { ProContext } from '../../App';
import "../pages/App.css";
import "../pages/test.css";
import arrow from "../images/arrow.png";
import Navbar from './Navbar2';

import { MultiUploader } from "../../Uploader/Uploader";

export default function UpdateProduct() {


    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [price, setprice] = useState('');
    const [quantity, setquantity] = useState('');
    const { Images, setImages } = useContext(ImagesContext);

    const { ProID } = useContext(ProContext);

    const [errT, seterrT] = useState(false)
    const [errD, seterrD] = useState(false)
    const [errI, seterrI] = useState(false)
    const [errP, seterrP] = useState(false)
    const [errQ, seterrQ] = useState(false)
const[error,seterror]=useState('');
console.log("THIS IS ID : ",ProID)
    useEffect(() => {
        console.log("helo")
        Axios.get(`http://localhost:3006/get_product_edit/${ProID}`).then((response) => {
        console.log(response.data)
          setTitle(response.data[0].Name);
          setDescription(response.data[0].Description);
          setprice(response.data[0].Price);
          setquantity(response.data[0].Quantity);
          var temp = response.data;
          temp.forEach(element => {
            element.Images = JSON.parse(element.Images)
          });
          setImages(temp[0].Images);
      })
      }, []);

    const publish = () => {


        if (title === "") {
            //   seterrE(true)
            seterror("Title is Required")
            seterrT(true)
        } else if (price === "") {

            //   seterrE(true)
            seterror("Price is Required")
            seterrP(true)
        }
        else if (quantity === "") {

            //   seterrE(true)
            seterror("Quantity is Required")
            seterrQ(true)
        }
        else if (Description === "") {

            //   seterrE(true)
            seterror("Description is Required")
            seterrD(true)
        }
        else if (Images.length === 0) {
            //   seterrE(true)
            seterror("Images is Required")
            seterrI(true)
        }
        else {
            console.log("helo");
            Axios.put(`http://localhost:3006/update_Product/${ProID}`, { Name: title, Description: Description, Price: price, Images: JSON.stringify(Images),Quantity:quantity }).then((response) => {
                console.log(response.data);
                console.log("helo2");
                seterrD(false);
                seterrI(false);
                seterrQ(false);
                seterrP(false);
                seterrT(false);

                navigate("/managestore")
            })
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()

    }



    const [err, setErr] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const priceHandle = (e) => {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
        if (e.target.value == "") {
            seterrP(true)
        }
        else {
            seterrP(false)
        }
        if (e.target.value === "" || re.test(e.target.value)) {
            setprice(e.target.value);
        }
    };
    const QuantityHandle = (e) => {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
        if (e.target.value == "") {
            seterrQ(true)
        }
        else {
            seterrQ(false)
        }
        if (e.target.value === "" || re.test(e.target.value)) {
            setquantity(e.target.value);
        }
    };

    const titleHandle = (e) => {

        if (e.target.value == "") {
            seterrT(true)
        }
        else {
            seterrT(false)
        }


        if (e.target.value.length > 50) {
            setErrMessage("Title length less than 50")
            setErr(true)
        } else {
            setTitle(e.target.value)
            setErrMessage("")
            setErr(false)
        }
    };




    const DesHandle = (e) => {
        if (e.target.value == "") {
            seterrD(true)
        }
        else {
            seterrD(false)
        }
        const temp = e.target.value;
        setDescription(temp);
    }
    useEffect(() => {
        if (!localStorage.getItem('email_token')) {
            navigate('/login')
        }
    }, [])
    return (
        <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
        <Navbar />
        <div className="back">

            <section className="sell-main">
                <div className="conatiner mt-5">
                    <div className="sell-main-content">
                        <div className="signup-form w-100">
                            {/* New Design */}
                            <div className="">
                                <div className="d-flex align-items-center w-full justify-content-between p-1">
                                    <a href="/managestore">
                                        <img className="pass-icon4" src={arrow} alt=""></img>
                                    </a>
                                    
                                    <h2 className="addproduct-title mx-auto">UPDATE PRODUCT</h2>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    {/* Forms */}
                                    <div className="p-5">
                                        {/* Row 2 */}


                                        {/* Row 3 */}
                                        <div className="d-flex w-100 justify-between my-2">
                                            <div className="w-50 p-1">
                                                <h6>Product Name</h6>
                                                <input
                                                    style={{ backgroundColor: '#FFFFFF', border:"2px solid #008083" }}
                                                    value={title}
                                                    onChange={titleHandle}
                                                    name=""
                                                    id=""
                                                    className="customform w-100"
                                                    placeholder="Ad Title"
                                                    required
                                                />

                                                {errT ? <span style={{ color: "red" }}>Name Is Required</span> : ""}
                                            </div>

                                            <div className="w-50 p-1">
                                                <h6>Set Price</h6>
                                                <input
                                                    style={{ backgroundColor: '#FFFFFF', borderRadius:"30px", border:"2px solid #008083" }}
                                                    value={price}
                                                    onChange={priceHandle}
                                                    type="text"
                                                    name=""
                                                    id=""
                                                    className="customform w-100"
                                                    placeholder="RS | "
                                                />

                                                {errP ? <span style={{ color: "red" }}>Price Is Required</span> : ""}
                                            </div>
                                            <div className="w-50 p-1">
                                                <h6>Set Quantity</h6>
                                                <input
                                                    style={{ backgroundColor: '#FFFFFF', borderRadius:"30px", border:"2px solid #008083"  }}
                                                    value={quantity}
                                                    onChange={QuantityHandle}
                                                    type="text"
                                                    name=""
                                                    id=""
                                                    className="customform w-100"
                                                    placeholder="Quantity"
                                                />

                                                {errP ? <span style={{ color: "red" }}>Quantity Is Required</span> : ""}
                                            </div>
                                        </div>
                                        <div >
                                            <div>
                                                <p>{errMessage}</p>
                                            </div>

                                            <h6 >Product Description</h6>
                                            <textarea
                                                style={{ backgroundColor: '#FFFFFF', borderRadius:"10px", border:"2px solid #008083" }}
                                                name=""
                                                id=""
                                                className="customform1 w-100"
                                                rows="5"
                                                onChange={DesHandle}
                                            ></textarea>

                                            {errD ? <span style={{ color: "red" }}>Description Is Required</span> : ""}
                                        </div>
                                        <div className="add-text">

                                            <br></br>
                                            <h5>Upload photos</h5>
                                        </div>

                                        <div className="d-flex mt-3 justify-content-between">
                                            <MultiUploader />
                                            {errI ? <span style={{ color: "red" }}>Images Is Required</span> : ""}
                                        </div>

                                        <button onClick={publish} className="PostNow">
                                            Update
                                        </button>

                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </div>
    </div>
    );
}
