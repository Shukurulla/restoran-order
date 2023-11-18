import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  foods: [],
};
const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    getFoodStart: (state) => {
      state.isLoading = true;
    },
    getFoodSuccess: (state, action) => {
      state.isLoading = false;
      state.foods = action.payload;
    },
    getFoodFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getFoodFailure, getFoodStart, getFoodSuccess } =
  foodSlice.actions;

export default foodSlice.reducer;
