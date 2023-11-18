import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  sum: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders = action.payload;
    },
    addSum: (state, action) => {
      state.sum = action.payload;
    },
  },
});

export const { addOrder, addSum } = orderSlice.actions;
export default orderSlice.reducer;
