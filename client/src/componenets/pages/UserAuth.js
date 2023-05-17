import React, { Component, useContext, useEffect } from 'react'
import { useState } from 'react';
import Axios from 'axios'
import { Link, resolvePath, useNavigate } from "react-router-dom";
import { ImagesContext } from '../../App';
import { AdContext } from '../../App';
import "../pages/App.css";
import "../pages/test.css";
import arrow from "../images/arrow1.png";
import imag2 from '../images/login6.jpg';
import Navbar from './NavbarHome';
import { MultiUploader } from "../../Uploader/Uploader";

function UserAuth() {


    const navigate = useNavigate();
    const [Name, setName] = useState('');
    const [NTN, setNTN] = useState('');
    const [CNIC, setCNIC] = useState('');
    const { Images } = useContext(ImagesContext);
    const [error, seterror] = useState('');
    const [email, setEmail] = useState('');


    const [errT, seterrT] = useState(false)
    const [errD, seterrD] = useState(false)
    const [errI, seterrI] = useState(false)
    const [errP, seterrP] = useState(false)
    const [errQ, seterrQ] = useState(false)


    const publish = () => {
        var email = localStorage.getItem("email_token");

        if (Name === "") {
            //   seterrE(true)
            seterror("Name is Required")
            seterrT(true)
        }
        else if (CNIC === "") {

            //   seterrE(true)
            seterror("CNIC is Required")
            seterrQ(true)
        } else if (CNIC.length != 13) {

            //   seterrE(true)
            seterror("CNIC must be 13")
            seterrQ(true)
        } else if (NTN === "") {

            //   seterrE(true)
            seterror("NTN is Required")
            seterrD(true)
        }
        else if (Images.length === 0) {
            //   seterrE(true)
            seterror("Images is Required")
            seterrI(true)
        }
        else {
            Axios.post("http://localhost:3006/AuthRequest", { User: email, Name: Name, CNIC: CNIC, NTN: NTN, Images: JSON.stringify(Images) }).then((response) => {
                console.log(response.data);

                console.log("helo2");
                seterrD(false);
                seterrI(false);
                seterrQ(false);
                seterrP(false);
                seterrT(false);
            })
            navigate("/profile")
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }



    const [err, setErr] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const CNICHandle = (e) => {
        const re = /^[0-9\b]+$/;

        if (e.target.value == "") {
            seterrQ(true)
        }
        else {
            seterrQ(false)
        }
        if (e.target.value === "" || re.test(e.target.value) || e.target.value.length === 13) {
            setCNIC(e.target.value);
        }
    };

    const NameHandle = (e) => {

        if (e.target.value == "") {
            seterrT(true)
        }
        else {
            seterrT(false)
        }
        if (e.target.value.length > 50) {
            setErrMessage("Name length less than 50")
            setErr(true)
        } else {
            setName(e.target.value)
            setErrMessage("")
            setErr(false)
        }
    };

    const NTNHandle = (e) => {
        if (e.target.value == "") {
            seterrD(true)
        }
        else {
            seterrD(false)
        }
        const temp = e.target.value;
        setNTN(temp);
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
                <div className='sell-banner'>
                    <div className="overlaybg0"></div>
                    <img className="img1" src={imag2}></img>
                    <div className='ContentLanding'>
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
                                                <h2 className="form-title mx-auto">USER AUTHENTICATION</h2>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                {/* Forms */}
                                                <div className="p-5">
                                                    {/* Row 2 */}


                                                    {/* Row 3 */}
                                                    <div className="d-flex w-100 justify-between my-2">
                                                        <div className="w-50 p-1">
                                                            <div className='w-full'>
                                                            <h6>Full Name</h6>
                                                            </div>
                                                            <input
                                                                style={{ backgroundColor: "transparent", color: "#FFFFFF", border: "2px solid white", borderRadius: "30px" }}
                                                                value={Name}
                                                                onChange={NameHandle}
                                                                name=""
                                                                id=""
                                                                className="customform w-100"
                                                                required
                                                            />

                                                            {errT ? <span style={{ color: "#00ffff" }}>Name Is Required</span> : ""}
                                                        </div>


                                                        <div className="w-50 p-1">
                                                        <div className='w-full'>
                                                            <h6>CNIC Number</h6>
                                                            </div>
                                                            <input
                                                                style={{ backgroundColor: "transparent", color: "#FFFFFF", border: "2px solid white", borderRadius: "30px" }}
                                                                value={CNIC}
                                                                onChange={CNICHandle}
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                className="customform w-100"
                                                                required
                                                            />

                                                            {errQ ? <span style={{ color: "#00ffff" }}>CNIC Is Required</span> : ""}
                                                        </div>
                                                    </div>


                                                    <div className="w-50 p-1">
                                                    <div className='w-full'>
                                                        <h6>National Tax Number</h6>
                                                        </div>
                                                        <input
                                                            style={{ backgroundColor: "transparent", color: "#FFFFFF", border: "2px solid white", borderRadius: "30px" }}
                                                            value={NTN}
                                                            onChange={NTNHandle}
                                                            type="text"
                                                            name=""
                                                            id=""
                                                            className="customform w-100"
                                                            required
                                                        />

                                                        {errD ? <span style={{ color: "#00ffff" }}>NTN Is Required</span> : ""}
                                                    </div>

                                                    <div className="custom-text">

                                                        <br></br>
                                                        <h5>Upload CNIC and Proof of Address</h5>
                                                    </div>

                                                    <div className="d-flex mt-3 justify-content-between">
                                                        <MultiUploader />
                                                        {errI ? <span style={{ color: "#00ffff" }}>CNIC & Proof Of Address is Required</span> : ""}
                                                    </div>

                                                    <button onClick={publish} className="PostNow">
                                                        Reqeust Now
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
            </div>
        </div>
    );
}

export default UserAuth;