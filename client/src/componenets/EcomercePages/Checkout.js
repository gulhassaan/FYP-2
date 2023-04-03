import StripeCheckout from 'react-stripe-checkout';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function CheckOut() {
  const publishableKey ='pk_test_51MsesNESBvw311mbWj3r2OFkQwFFMe4D7RMzgAKGeTG098CKUKaWM94uwjdr4n817sKAsR43uJPd16iWAZw2jr2n00E5j0gOc7';
  const [product, setProduct] = useState({
    name: 'Headphone',
    price: 5,
  });

  const [Email,setEmail] = useState("");
const [Cost ,setCost] = useState(1); 

useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setCost(parseInt(localStorage.getItem("TotalBill")))

  }, []);




  const priceForStripe = product.price * 100;

  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };
  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:5000/payment',
        method: 'post',
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="container">
   <p>
        <span>Product: </span>
        {Email}
      </p>
      <p>
        <span>Price: </span>Rs.{Cost}
      </p>

  </div>
  );
}

export default CheckOut;