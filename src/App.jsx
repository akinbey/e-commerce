import { useEffect, useState } from "react";
import "./App.css";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";
import RouterConfig from "./config/RouterConfig";
import { Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateBasket,
  setDrawer,
  removeProductFromBasket,
} from "./redux/slices/basketSlices";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const { products, drawer, totalAmount } = useSelector(
    (store) => store.basket
  );

  useEffect(() => {
    dispatch(calculateBasket());
  }, [products.length]); // Sonsuz döngüyü önlemek için sadece `length` takibi yapıyoruz

  console.log("Redux Store - Products:", products);
  console.log("Redux Store - Total Amount:", totalAmount);

  const handleDelete = (productId) => {
    // Sepetten ürün silme
    dispatch(removeProductFromBasket(productId));
  };

  return (
    <>
      <PageContainer>
        <Header />

        <RouterConfig />
        <Drawer
          className="drawer"
          sx={{ padding: "20px" }}
          anchor="right"
          onClose={() => dispatch(setDrawer())} //! zaten her setlediğimizde tersini alıyoruz. bu sebeple bos bi alana tıkladıgımızda sepet kapanacak
          open={drawer}
        >
          {products &&
            products.map((product) => {
              return (
                <div>
                  <div
                    key={product.id}
                    className="product-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <img
                      style={{
                        width: "4rem",
                        height: "4rem",
                        marginRight: "1rem",
                      }}
                      className="product-image"
                      src={product.image || "default-image.jpg"}
                      alt={product.title || "Ürün Resmi"}
                    />
                    <p
                      style={{
                        flex: 1,
                        fontSize: "1rem",
                        lineHeight: 1.4,
                        width: "15rem",
                      }}
                      className="product-title"
                    >
                      {product.title} ({product.count})
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: "6rem",
                      }}
                      className="product-price"
                    >
                      {product.price} TL
                    </p>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="delete-button"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              );
            })}
          <div className="total-amount">
            <p>TOPLAM TUTAR : {totalAmount} TL</p>
          </div>
        </Drawer>
      </PageContainer>
    </>
  );
}

export default App;
