import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  sum: 0,
  id: [],
  orderLength: 0,
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
    addId: (state, action) => {
      state.id = action.payload;
    },
    addOrderLength: (state, action) => {
      state.orderLength = action.payload;
    },
  },
});

export const { addOrder, addSum, addId, addOrderLength } = orderSlice.actions;
export default orderSlice.reducer;
