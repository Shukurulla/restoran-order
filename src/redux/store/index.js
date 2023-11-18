import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "../slice/category-slice";
import FoodReducer from "../slice/food-slice";
import OrderReducer from "../slice/order-slice";

const store = configureStore({
  reducer: {
    category: CategoryReducer,
    food: FoodReducer,
    order: OrderReducer,
  },
  devTools: process.env.NODE_ENV != "production",
});

export default store;
