import { configureStore } from "@reduxjs/toolkit";
import appReducers from "../redux/slices/appSlices";
import productReducers from "../redux/slices/productSlices";
import basketReducers from "../redux/slices/basketSlices";
import searchReducers from "../redux/slices/searchSlices";

export const store = configureStore({
  reducer: {
    app: appReducers,
    product: productReducers,
    basket: basketReducers,
    search: searchReducers,
  },
});
