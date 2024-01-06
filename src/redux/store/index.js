import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "../slice/category-slice";
import FoodReducer from "../slice/food-slice";
import OrderReducer from "../slice/order-slice";
import TableReducer from "../slice/tables";
import UserReducer from "../slice/user";
import DiscountReducer from "../slice/discount";
import DjReducer from "../slice/dj-slice";
import OfitsiantService from "../slice/ofitsiant-slice";
import MusicReducer from "../slice/music";
import KaraokeReducer from "../slice/karaoke-slice";
import SavedReducer from "../slice/saved";

const store = configureStore({
  reducer: {
    category: CategoryReducer,
    food: FoodReducer,
    order: OrderReducer,
    table: TableReducer,
    user: UserReducer,
    discount: DiscountReducer,
    dj: DjReducer,
    ofitsiant: OfitsiantService,
    music: MusicReducer,
    karaoke: KaraokeReducer,
    saved: SavedReducer,
  },
  devTools: process.env.NODE_ENV != "production",
});

export default store;
