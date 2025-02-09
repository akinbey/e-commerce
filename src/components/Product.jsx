import React from "react";
import "../css/Product.css";
import { useNavigate } from "react-router-dom";
// import Button from '@mui/material/Button';

function Product({ product }) {
  const navigate = useNavigate();

  const { id, price, description, title, image } = product;
  console.log(product);
  return (
    <div>
      <div onClick={() => navigate("/product-details/" + id)} className="card">
        <img className="image" src={image} alt="" />
        <div>
          <p className="title-height">
            {title.slice(0, 20)}
            {title.length > 25 ? "..." : ""}
          </p>
          <h5>
            {description?.slice(0, 50)} {description.length > 50 ? "..." : ""}{" "}
          </h5>
          <h4>{price} ₺</h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <button
              onClick={() => navigate("/product-details/" + id)}
              className="detail-button"
            >
              Detaya Git
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
