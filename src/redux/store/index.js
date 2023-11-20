import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "../slice/category-slice";
import FoodReducer from "../slice/food-slice";
import OrderReducer from "../slice/order-slice";
import TableReducer from "../slice/tables";

const store = configureStore({
  reducer: {
    category: CategoryReducer,
    food: FoodReducer,
    order: OrderReducer,
    table: TableReducer,
  },
  devTools: process.env.NODE_ENV != "production",
});

export default store;
