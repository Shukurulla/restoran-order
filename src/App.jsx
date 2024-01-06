import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Bearer from "./components/bearer";
import Category from "./pages/category/category";
import Check from "./pages/check/check";
import Home from "./pages/home/home";
import Karakoe from "./pages/karaoke/karakoe";
import Main from "./pages/main/main";
import Music from "./pages/music/music";
import Order from "./pages/order/order";
import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} from "./redux/slice/category-slice";
import {
  getDiscountFailure,
  getDiscountStart,
  getDiscountSuccess,
} from "./redux/slice/discount";
import {
  getFoodFailure,
  getFoodStart,
  getFoodSuccess,
} from "./redux/slice/food-slice";
import { getTables } from "./redux/slice/tables";
import { getDevice, getIpAddress } from "./redux/slice/user";
import CategoryService from "./service/category-service";
import discountService from "./service/discount";
import FoodService from "./service/food-service";
import KaraokeService from "./service/karaoke";
import MusicService from "./service/music-service";
import OfitsiantService from "./service/ofitsiant-service";
import SavedServeice from "./service/saved";
import djService from "./service/serviceDj";
import TableService from "./service/tables";

function App() {
  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state.food);
  const { categories } = useSelector((state) => state.category);
  const isLoading = foods.length > 0 && categories.length > 0 ? false : true;

  const getCategory = async () => {
    dispatch(getCategoryStart());
    try {
      const { data } = await CategoryService.getCategory();
      dispatch(getCategorySuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getCategoryFailure());
    }
  };
  const getFoods = async () => {
    dispatch(getFoodStart());
    try {
      const { data } = await FoodService.getFoods();
      dispatch(getFoodSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getFoodFailure());
    }
  };

  const getTable = async () => {
    try {
      const { data } = await TableService.getTable();
      dispatch(getTables(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getDiscount = async () => {
    dispatch(getDiscountStart());
    try {
      const { data } = await discountService.getDiscount();
      dispatch(getDiscountSuccess(data));
      console.log(data);
    } catch (error) {
      dispatch(getDiscountFailure());
      console.log(error);
    }
  };

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => dispatch(getIpAddress(data)));
    MusicService.getMusic(dispatch);
    getCategory();
    getFoods();
    getTable();
    dispatch(getDevice(navigator.userAgent));
    getDiscount();
    djService.getDjService(dispatch);
    OfitsiantService.getOfitsiant(dispatch);
    KaraokeService.getKaraoke(dispatch);
    SavedServeice.getSaved(dispatch);
  }, []);

  const second = new Date().getSeconds();

  useEffect(() => {
    MusicService.getMusic(dispatch);
  }, [second]);

  return isLoading ? (
    <div className="bearer">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="body">
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/menu/table/:id" element={<Bearer />} />
          <Route path="/check/table/:id" element={<Check />} />
          <Route path="/music" element={<Music />} />
          <Route path="/karaoke" element={<Karakoe />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
