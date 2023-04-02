import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NavbarD from "./NavbarD";
const Cart = () => {

const [cart, setCart] = useState([]);
const [count , setCount] = useState(1);
var email = localStorage.getItem("email");
useEffect(() => {
    Axios.get(`http://localhost:3006/Get_items`).then((response) => {
      console.log("THis is Response Data : ", response.data)
      var temp = response.data;
      console.log(response.data);
      temp.forEach(element => {

        element.Images = JSON.parse(element.Images)

      });
      setCart(temp);
      console.log("After parse : ", temp)
    });
  }, []);


  console.log("THis is carty ", cart)

  const updateCart = (id, quantity) => {
    console.log("HELOE")
console.log(quantity);
    Axios.put(`http://localhost:3006/UpdateCart/${id}`, { Quantity :quantity })
      .then(res => {
        setCart(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const removeFromCart = (id) => {
    console.log(id)
    Axios.delete(`http://localhost:3006/RemoveCart/${id}`)
      .then(res => {
        setCart (cart.filter((val) => {
            return val.ProductId != id
          }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.ProductId}>
            {item.ProductName} - {item.Price}
            <button onClick={() => updateCart(item.ProductId, setCount(count+1))}>
              +
            </button>
            <button onClick={() => updateCart(item.ProductId, setCount(count-1))}>
              -
            </button>
            <button onClick={() => removeFromCart(item.ProductId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;