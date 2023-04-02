import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart')
      .then(res => {
        setCart(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const updateCart = (id, quantity) => {
    axios.put(`/api/cart/${id}`, { quantity })
      .then(res => {
        setCart(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const removeFromCart = (id) => {
    axios.delete(`/api/cart/${id}`)
      .then(res => {
        setCart(res.data);
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
          <li key={item.id}>
            {item.name} - {item.price}
            <button onClick={() => updateCart(item.id, item.quantity + 1)}>
              +
            </button>
            <button onClick={() => updateCart(item.id, item.quantity - 1)}>
              -
            </button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;