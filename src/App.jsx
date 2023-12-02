import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Bearer from "./components/bearer";
import Category from "./pages/category/category";
import Home from "./pages/home/home";
import Order from "./pages/order/order";
import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} from "./redux/slice/category-slice";
import {
  getFoodFailure,
  getFoodStart,
  getFoodSuccess,
} from "./redux/slice/food-slice";
import { getTables } from "./redux/slice/tables";
import { getDevice, getIpAddress } from "./redux/slice/user";
import CategoryService from "./service/category-service";
import FoodService from "./service/food-service";
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

  const getLocationIp = () => {
    axios
      .get(
        "https://geolocation-db.com/json/0daad5e0-82e7-11ee-92e0-f5d620c7dcb4"
      )
      .then(({ data }) => {
        dispatch(getIpAddress(data.IPv4));
      });
  };

  useEffect(() => {
    getCategory();
    getFoods();
    getTable();
    getLocationIp();
    dispatch(getDevice(navigator.userAgent));
  }, []);

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
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/menu/table/:id" element={<Bearer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
