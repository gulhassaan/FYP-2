import React, { useState } from "react";
import ".././pages/App.css";

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

  const handleCVVChange = (event) => {
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
        console.log(response.data);
        console.log("helo2");
      })
      .catch((error) => {
        console.error("Error submitting payment:", error);
      });

    // You can add your logic here to handle the payment
  };

  return (
    <div>
      <Navbar />

      <section className="Payment">
        <div className="container mt-5">
          <div className="Payment-content">
            <div className="signin-form">
              <h1>Payment Details</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="cardNumber">Card Number:</label>
                  <input
                    type="text"
                    id="CardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cardHolderName">Card Holder Name:</label>
                  <input
                    type="text"
                    id="CardName"
                    value={cardHolderName}
                    onChange={handleCardHolderNameChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="expirationDate">
                    Expiration Date (MM/YY):
                  </label>
                  <input
                    type="text"
                    id="ExpireDate"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                    required/>
                    </div>
                    <div>
                      <label htmlFor="cvv">CVV:</label>
                      <input
                        type="text"
                        id="Cvv"
                        value={cvc}
                        onChange={handleCVVChange}
                        required
                      />
                    </div>
                    <button type="submit" className="submit-button">
                      Submit Payment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    };
    
    export default Payment;
    
