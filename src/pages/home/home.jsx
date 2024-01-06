import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodContent from "../../components/food-content";
import Footer from "../../components/footer";
import Alert from "../../components/alert";
import {
  addId,
  addOrder,
  addOrderLength,
  addSum,
} from "../../redux/slice/order-slice";
import { useNavigate } from "react-router-dom";
import microphone from "../../../public/microphone.png";
import hamburger from "../../../public/hamburger.png";

const Home = () => {
  const { categories } = useSelector((state) => state.category);
  const { foods } = useSelector((state) => state.food);
  const { orders, id } = useSelector((state) => state.order);
  const { tables } = useSelector((state) => state.table);
  const { musics } = useSelector((state) => state.music);
  const [select, setSelect] = useState("all");
  const [showAlert, setShowAlert] = useState(false);
  const [food, setFood] = useState("");
  const hour = new Date().getHours();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const tableId = localStorage.getItem("tableId");
  const currentTable = tables.filter((c) => c._id == tableId)[0];

  const byCategory =
    select == "all" ? categories : categories.filter((c) => c.title == select);
  const byFood =
    select == "all" ? foods : foods.filter((c) => c.category == select);

  const handleOrder = (food) => {
    setShowAlert(true);

    setFood(food);
    dispatch(addId([...id, food._id]));

    dispatch(addOrder([...orders, food]));
  };

  useEffect(() => {
    const generate = orders.filter((c, idx) => c._id !== id[idx - 1]);
    dispatch(addOrderLength(generate));
    const totalSum = eval(orders.map((i) => i.price).join("+"));
    dispatch(addSum(totalSum));
  }, [food, id, orders]);

  return (
    <div className="home">
      <Alert
        msg={`Siz savatga ${food.foodName}ni qoshdingiz`}
        className={showAlert}
        setState={setShowAlert}
      />
      <div className="category-box">
        <div className="category-content">
          <div className="logo">Logo</div>
          <div className="order-header">
            {currentTable?.forDJ == true ? (
              <div>{/* <i className="bi bi-music-note-beamed"></i> */}</div>
            ) : (
              <div onClick={() => navigate("/karaoke")}>
                Karaoke <img src={microphone} alt="" />
              </div>
            )}
            <i className="bi bi-cart" onClick={() => navigate("/order")}>
              {" "}
              {orders.length > 0 && <span>{orders.length}</span>}
            </i>
          </div>
        </div>
      </div>
      <div className="category-content">
        <div
          className="categories"
          style={{ width: categories.length * 25 + "%" }}
        >
          <div
            className={`category-item ${select == "all" ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            <img
              src="https://spng.pngfind.com/pngs/s/73-734350_food-dish-top-view-png-food-banner-psd.png"
              alt=""
            />
            Hammasi
          </div>
          {categories.map((item) => (
            <div
              className={`category-item ${
                select == item.title ? "active" : ""
              }`}
              key={item._id}
              onClick={() => navigate(`/category/${item.title}`)}
            >
              <img
                src={foods?.filter((c) => c.category === item.title)[0]?.image}
                alt=""
              />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="food-box">
        {byCategory.map((item) => (
          <FoodContent
            category={item.title}
            addOrder={handleOrder}
            foods={byFood}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
