import React, { useState } from 'react';
import './Ecommerce.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Item 1", price: 10, img: "https://via.placeholder.com/150", quantity: 1 },
    { id: 2, name: "Item 2", price: 15, img: "https://via.placeholder.com/150", quantity: 1 },
    { id: 3, name: "Item 3", price: 20, img: "https://via.placeholder.com/150", quantity: 1 },
    { id: 4, name: "Item 4", price: 25, img: "https://via.placeholder.com/150", quantity: 1 },
    { id: 5, name: "Item 5", price: 30, img: "https://via.placeholder.com/150", quantity: 1 },
  ]);

  const incrementQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const decrementQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const deleteItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const calculateTotalBill = () => {
    const totalBill = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    return totalBill;
  };

  return (
    <div className="cart-container">
      <h1 className='title-label'>Add to Cart Page</h1>
      <div className="items-container">
        {cartItems.map((item) => (
          <div className="item" key={item.id}>
            <img src={item.img} alt={item.name} />
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <p className="item-price">{item.price}</p>
              <div className="quantity-container">
                <button className="quantity-btn" onClick={() => decrementQuantity(item.id)}>-</button>
                <span className="item-quantity">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => incrementQuantity(item.id)}>+</button>
              </div>
              <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <h2 className='total-label'>Total Bill: {calculateTotalBill()}</h2>
    </div>
  );
};

export default Cart;
