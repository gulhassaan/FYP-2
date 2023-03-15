import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  const { page, pageSize } = props;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  if (props.index < startIndex || props.index >= endIndex) {
    return null;
  }

  return (
    <div className="product" style={{border: "1px solid #005F60"}}>
      <div className="product">
        <img src={productImage} />
        <div className="description">
          <p>
            <b>{productName}</b>
          </p>
          <p> Rs {price}/-</p>
        </div>
        <button className="addToCartBttn" onClick={() => addToCart(id)}>
          Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
        </button>
      </div>
    </div>
  );
};
