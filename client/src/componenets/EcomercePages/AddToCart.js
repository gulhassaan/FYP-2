import React from "react";
import { useLocation } from "react-router-dom";
import "./Ecommerce.css";
import Navbar from "./NavbarS";

const AddToCart = () => {
  const location = useLocation();
  const { id, name, price, image } = location.state;

  return (
    <div> <Navbar/>
    <div className="container">
      
      <h1>Add to Cart</h1>

      <div className="product-row">
        <img className="addtoimg" src={image} alt={name} />
        <div className="product-details">
          <p className="product-name">{name}</p>
          <p className="product-price">{price}</p>
          {/* other Add to Cart logic */}
        </div>
      </div>

    </div>
    </div>
  );
};

export default AddToCart;
