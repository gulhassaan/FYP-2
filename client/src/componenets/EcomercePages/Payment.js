import React, { useState } from "react";
import ".././pages/App.css";

import { NavLink, useNavigate } from "react-router-dom";
import upd from "../images/updated.png";
import Navbar from "../EcomercePages/NavbarS";
import useEffect from "react";
import "@fontsource/montserrat";

export function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardHolderNameChange = (event) => {
    setCardHolderName(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation
    if (!cardNumber || !cardHolderName || !expirationDate || !cvv) {
      // Show error message if any field is missing
      console.log("Please fill in all the required fields.");
      return;
    }

    // Perform further actions, such as processing the payment
    console.log("Card Number:", cardNumber);
    console.log("Card Holder Name:", cardHolderName);
    console.log("Expiration Date:", expirationDate);
    console.log("CVV:", cvv);
    // You can add your logic here to handle the payment
  };

  return (
    <div>
      <Navbar />

      <section className="Payment">
        <div className="conatiner mt-5">
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
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv">CVV:</label>
                  <input
                    type="text"
                    id="Cvv"
                    value={cvv}
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
}
