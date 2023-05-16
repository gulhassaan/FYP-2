import React, { useState } from "react";
import ".././pages/App.css";
import "../EcomercePages/Payment.css";
import Navbar from "../EcomercePages/NavbarS";
import axios from "axios";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
const [cvc,setCvc] = useState('')
  const Bill = localStorage.getItem("TotalBill");
  console.log(Bill);
  const email = localStorage.getItem("email_token");
  console.log(email);

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

    // Perform validation
    if (!cardNumber || !cardHolderName || !expirationDate || !cvc) {
      // Show error message if any field is missing
      console.log("Please fill in all the required fields.");
      return;
    }

    // Perform further actions, such as processing the payment
    console.log("Card Number:", cardNumber);
    console.log("Card Holder Name:", cardHolderName);
    console.log("Expiration Date:", expirationDate);
    console.log("Month:", month);
    console.log("Year:", year);

    // Send payment details to the server
    axios.post("http://localhost:3006/payment", {
        Email: email,
        Price: Bill,
        ExpiryMonth: month,
        ExpiryYear: year,
        CVC:cvc,
        Card:cardNumber
      })
      .then((response) => {
        console.log(response.status);
        if(response.status==200)
        {
          console.log("Payment Successful")
        }
      })
      .catch((error) => {
        console.log("Payment Unsuccessfull, Please Enter accurate credentials")
        console.error("Error submitting payment:", error);
      });

    // You can add your logic here to handle the payment
  };
  
  const cardLogos = [
    'https://t.ly/VBHJ',
    'https://t.ly/N62N',
    'https://t.ly/btuH',
  ];
  return (
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
            onChange={handleCardHolderNameChange}
            required
          />
        </div>
      
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVC</label>
          <input
            type="text"
            id="cvv"
            value={cvc}
            onChange={handleCvcChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
      <div className="form-group logos" style={{marginTop:40}}>
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
            required
          />
        </div>
      </div>
      <div className="form-row">
        <button type="submit" style={{marginBottom:200,marginTop:20}}>Submit Payment</button>
      </div>
    </form>
  </div>
      );
    };
    
    export default Payment;
    
