import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
  name: "discount",
  initialState: {
    isLoading: false,
    discount: [],
  },
  reducers: {
    getDiscountStart: (state) => {
      state.isLoading = true;
    },
    getDiscountSuccess: (state, action) => {
      state.discount = action.payload;
      state.isLoading = false;
    },
    getDiscountFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getDiscountFailure, getDiscountStart, getDiscountSuccess } =
  discountSlice.actions;

export default discountSlice.reducer;
