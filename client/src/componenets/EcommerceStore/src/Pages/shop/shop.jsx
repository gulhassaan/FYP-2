import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import banner from "../../images/banner.png";
export const Shop = () => {
  return (
    <div className="shop">
      <div className="shopBanner">
  <img src={banner} alt="Gamingstan Ecommerce Banner" style={{ width: "50%", height: "100%", objectFit: "cover" , paddingTop: "30px" }} />
</div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>

      <footer className="footer">
        <p>&copy; 2023 Gamingstan Ecommerce</p>
      </footer>
    </div>
  );
};
