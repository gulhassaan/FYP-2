import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdDContext } from "../../App";
import axios from "axios";
import { CartContext } from "./CartContext";
const AddToCart = (props) => {
  const navigate = useNavigate();
  const { AdD } = useContext(AdDContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const product = props.location.state.product;
    const cartItem = {
      id: product.Id,
      name: product.Name,
      price: product.Price,
      image: props.location.state.product.Images[0],
      quantity: quantity,
    };
    const updatedCartItems = [...cartItems];
    let found = false;
    updatedCartItems.forEach((item) => {
      if (item.id === cartItem.id) {
        item.quantity += quantity;
        found = true;
      }
    });
    if (!found) {
      updatedCartItems.push(cartItem);
    }
    setCartItems(updatedCartItems);
    axios
      .post("http://localhost:3006/addtocart", {
        Email: localStorage.getItem("email_token"),
        Ad_Id: AdD,
        Product_Id: cartItem.id,
        Quantity: cartItem.quantity,
      })
      .then((response) => {
        console.log(response.data);
      });
    navigate("/cart");
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div style={{ padding: "3rem" }}>
      <h1>Add To Cart</h1>
      <image >{props.state.product.image}</image>
      <p>{props.location.state.product.Name}</p>
      <p>Price: {props.location.state.product.Price}</p>
      <label>
        Quantity:{" "}
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </label>
      <button onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
};

export default AddToCart;
