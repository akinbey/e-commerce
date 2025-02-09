import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  selectedProduct: {},
  loading: false,
};

const BASE_URL = "https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      //! secili ürünümüz
      state.selectedProduct = action.payload; //! doldurduk
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      //! bekleme sırası
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      //! başarılı olursa
      state.loading = false;
      state.products = action.payload; //! dolduruyoruz
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      console.error("API isteği başarısız oldu:", action.error);
    });
  },
});

export const { setSelectedProduct } = productSlice.actions; //! fonksiyonları dısarı acmamızı saglar
export default productSlice.reducer;
