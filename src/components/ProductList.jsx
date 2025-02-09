import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/slices/productSlices";
import Product from "./Product";

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);

  const { searchTerm } = useSelector((store) => store.search); // ⬅ Arama state’ini alıyoruz

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // 🔹 Eğer ürünlerin title değeri yoksa hata olmaması için "" (boş string) atanıyor.
  const filteredProducts = products.filter((product) =>
    (product.title || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase())
  );

  return (
    <div className="flex-row main-product">
      {loading ? (
        <p className="loading-text">Ürünler yükleniyor...</p>
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <p className="no-results">Aradığınız ürün bulunamadı.</p>
      )}
    </div>
  );
}

export default ProductList;
