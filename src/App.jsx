import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
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
import CategoryService from "./service/category-service";
import FoodService from "./service/food-service";
import TableService from "./service/tables";

function App() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    getCategory();
    getFoods();
    getTable();
  }, []);

  return localStorage.getItem("tableId") == undefined ? (
    <Bearer />
  ) : (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/menu/table/:id" element={<Bearer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
