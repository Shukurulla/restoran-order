import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoryStart: (state) => {
      state.isLoading = true;
    },
    getCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    getCategoryFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getCategoryFailure, getCategoryStart, getCategorySuccess } =
  categorySlice.actions;

export default categorySlice.reducer;
