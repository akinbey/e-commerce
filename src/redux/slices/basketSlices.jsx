import { createSlice } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

const initialState = {
  products: getBasketFromStorage(),
  drawer: false,
  totalAmount: 0,
};

const writeFromBasketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const basketSlices = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      if (!Array.isArray(state.products)) {
        state.products = []; // eger products dizisi null/undefined ise sıfırlıyorum
      }

      const findProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (findProduct) {
        // urun zaten sepetteyse, sayısını guncelledim
        state.products = state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, count: product.count + action.payload.count }
            : product
        );
      } else {
        //urun  sepette yoksa , ekliyorum
        state.products = [...state.products, action.payload];
      }

      // guncel veriyi localStorage'a kaydettik
      writeFromBasketToStorage(state.products);
    },
    setDrawer: (state) => {
      //! drawerin zıttını set ediyoruz.
      state.drawer = !state.drawer;
    },

    calculateBasket: (state) => {
      state.totalAmount = state.products.reduce(
        (sum, product) => sum + product.price * product.count,
        0
      );
    },

    removeProductFromBasket: (state, action) => {
      const productId = action.payload;

      // sepetten ürünü silme islemim
      state.products = state.products.filter(
        (product) => product.id !== productId
      );

      // guncellenmiş sepeti localStorage'a kaydettim
      localStorage.setItem("basket", JSON.stringify(state.products));
    },
  },
});

export const {
  addToBasket,
  setDrawer,
  calculateBasket,
  removeProductFromBasket,
} = basketSlices.actions;
export default basketSlices.reducer;
