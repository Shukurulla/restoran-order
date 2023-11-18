import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
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
import CategoryService from "./service/category-service";
import FoodService from "./service/food-service";

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

  useEffect(() => {
    getCategory();
    getFoods();
  }, []);
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
