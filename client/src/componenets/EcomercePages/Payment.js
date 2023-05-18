import React, { useState } from "react";
import ".././pages/App.css";
import { useNavigate } from "react-router-dom";
import "../EcomercePages/Payment.css";

import axios from "axios";
import NavbarD from "./NavbarD";
import imag2 from '../images/login10.jpg';
const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [month, setMonth] = useState("");
  const [error,seterror] = useState(0);
  const [year, setYear] = useState("");
  var PkgType = localStorage.getItem("PackageType");
  var id = localStorage.getItem("SetIDPKG")
console.log("ID ISWAS",id)
  const navigate = useNavigate();
  const [cvc, setCvc] = useState('')
  const Bill = localStorage.getItem("TotalBill");
  console.log(Bill);
  const email = localStorage.getItem("email_token");
  console.log(email);
  var days = localStorage.getItem("PackageDays");



  const [errN, seterrN] = useState(false)
  const [errD, seterrD] = useState(false)
  const [errCN, seterrCN] = useState(false)
  const [errCVC, seterrCVC] = useState(false)


  const cartCheck = localStorage.getItem("cart")
  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardHolderNameChange = (event) => {
    setCardHolderName(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    const date = event.target.value;
    const [month, year] = date.split('/').map((item) => item.trim());
    setExpirationDate(date);
    setMonth(month);
    setYear(year);

  };

  const handleCvcChange = (event) => {
    setCvc(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();



    if (cardHolderName === "") {

      seterror("Name is Required")
      seterrN(true)
  }
  else if (cardNumber === "") {

 
      seterror("Card number is Required")
      seterrCN(true)
  } else if (cardNumber.length != 16) {

      seterror("Card Number must be 16 digits")
      seterrCN(true)
  } else if (cvc === "") {

      //   seterrE(true)
      seterror("CVC is Required")
      seterrCVC(true)
  }else if (cvc.length != 3) {

      //   seterrE(true)
      seterror("CVC Must be 3 digits")
      seterrCVC(true)
  }else if (expirationDate ==="") {

    //   seterrE(true)
    seterror("Date is Required")
    seterrD(true)
  }else{
  console.log(email,Bill,month,year,cvc,cardNumber);
    axios.post("http://localhost:3006/payment", {
     
      Email: email,
      Price: Bill,
      ExpiryMonth: month,
      ExpiryYear: year,
      CVC: cvc,
      Card: cardNumber
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200 && cartCheck==1) {
seterror(0)
console.log("THrought cart chanfe")
          axios.post(`http://localhost:3006/truncate`).then((res) => {
            console.log(res.data);  
          })
          navigate('/successfull')
          console.log("Payment Successful")
        }
        else if(PkgType !="" && response.status==200)
        {
          
console.log("THrought profiel chanfe")
          seterror(0)
          console.log(id,PkgType)
          axios.put(`http://localhost:3006/Buy_AdPackage/${id}`,{pkg : PkgType,Days:days}).then((res) => {
            console.log(res.data);  

          })
          navigate('/success')
        }
      })
      .catch((error) => {
        seterror(1)
        console.log("Payment Unsuccessfull, Please Enter accurate credentials")
        console.error("Error submitting payment:", error);
      });
    }
    // You can add your logic here to handle the payment
  };

  const CardNumberHandle = (e) => {
    const re = /^[0-9\b]+$/;
  
    if (e.target.value === "") {
      seterrCN(true);
    } else {
      seterrCN(false);
    }
  
    const inputValue = e.target.value.replace(/\D/g, ""); 
  
    if (inputValue.length <= 16) {
      setCardNumber(inputValue.slice(0, 16));
    }
  };
  
  

const NameHandle = (e) => {
    if (e.target.value == "") {
      seterrN(true);
    } else {
      seterrN(false);
    }
  
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(e.target.value)) {
        seterrN(true);
    } else {
      setCardHolderName(e.target.value);
      seterrN(false);
    }
  };
  
  const CVCHandle = (e) => {
    const re = /^[0-9\b]+$/;
    const inputValue = e.target.value.replace(/\D/g, ""); 
  
    if (inputValue.length === 0) {
      seterrCVC(true);
    } else
     {
      seterrCVC(false);
    }
  
    if (inputValue.length <= 3) {
      setCvc(inputValue);
    }
  };
  
  const DateHandle = (e) => {
    const dateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    const inputValue = e.target.value.replace(/\D/g, ""); 
    if (inputValue.length === 0) {
      seterrD(true);
    } else {
      seterrD(false);
    }
  
    if (e.target.value.length <= 5) {
      setExpirationDate(e.target.value);
    }
  };


  const cardLogos = [
    'https://t.ly/VBHJ',
    'https://t.ly/N62N',
    'https://t.ly/btuH',
  ];
  return (
    <div>
      <NavbarD />
      <div className='payment-banner'>
        <div className="overlaybg0"></div>
        <img className="img1" src={imag2}></img>
        <div className='ContentLanding'>
          <div className="payment-container">
            <h2>Total Bill: Rs.{Bill}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Card Holder Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={cardHolderName}
                    onChange={NameHandle}
                placeholder="Name"
                  />
                  {errN ? <span style={{ color: "#00ffff" }}>Name Is Required</span> : ""}
                </div>

              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={CardNumberHandle}
                    placeholder="****************"
                  />
                  {errCN ? <span style={{ color: "#00ffff" }}>Valid Card Number Is Required</span> : ""}
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVC</label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    value={cvc}
                    onChange={CVCHandle}
              
                  />
                  {errCVC ? <span style={{ color: "#00ffff" }}>Valid CVC Is Required</span> : ""}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group logos" style={{ marginTop: 40 }}>
                  {cardLogos.map((logo, index) => (
                    <img key={index} src={logo} alt={`Card Logo ${index}`} />
                  ))}
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">MM/YY</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                 placeholder="MM/YY"
                  />
                  {errD ? <span style={{ color: "#00ffff" }}>Valid Date Is Required</span> : ""}
                </div>
              </div>
              {error==1&&
              
                  <span style={{ color: "#00ffff" }}>Invalid Credentials</span> 
                }
              <div className="form-row" style={{ display: 'flex', justifyContent: 'center' }}>
  <button type="submit" style={{ marginBottom: 200, marginTop: 20, marginRight: 250 }}>Pay Now</button>
  
   </div>

            </form>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Payment;