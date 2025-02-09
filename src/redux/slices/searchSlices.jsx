import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

const searchSlices = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlices.actions;
export default searchSlices.reducer;
