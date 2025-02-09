import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slices/productSlices";
import "../css/ProductDetails.css";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket } from "../redux/slices/basketSlices";

function ProductDetails() {
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((store) => store.product);
  const { price, description, title, image } = selectedProduct;

  const dispatch = useDispatch();

  const [count, setCount] = useState(1); //! ürün adedi
  const increment = () => {
    //! arttırma fonksiyonu
    setCount(count + 1);
  };

  const decrement = () => {
    //! azaltma fonksiyonu
    setCount(count - 1);
  };

  const addBasket = () => {
    //! sepete ekleme fonksiyonu
    const payload = {
      id,
      price,
      description,
      title,
      image,
      count,
    };
    dispatch(addToBasket(payload));
  };

  useEffect(() => {
    //! component ilk render edildiginde fonksiyona gidicek
    getProductById();
  }, []);

  const getProductById = () => {
    products &&
      products.map((product) => {
        //! ürünleri map ile döndük
        if (product.id == id) {
          //! id'ler eşlendiyse
          dispatch(setSelectedProduct(product)); //! fonksiyonumuza product'larımızı verdik
        }
      });
  };

  return (
    <>
      <div className="product-container">
        <div className="product-image">
          <img src={image} alt={title} />
        </div>
        <div className="product-details">
          <h1>{title}</h1>
          <p className="product-description">{description}</p>
          <h1 className="product-price">{price}₺</h1>
          <div className="product-counter">
            <CiCirclePlus
              style={{ marginRight: "0.5rem" }}
              onClick={increment}
              className="icon"
            />
            <span>{count}</span>
            <CiCircleMinus
              style={{ marginLeft: "0.5rem" }}
              onClick={decrement}
              className="icon"
            />
          </div>
          <button onClick={addBasket} className="add-to-cart-btn">
            Sepete Ekle
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
