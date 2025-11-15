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
import io from "socket.io-client";
import MsgBox from "../../components/msg-box";

const socket = io.connect("https://api.kepket.uz");

const Home = () => {
  const { categories } = useSelector((state) => state.category);
  const { foods } = useSelector((state) => state.food);
  const { orders, id } = useSelector((state) => state.order);
  const { tables } = useSelector((state) => state.table);
  const [select, setSelect] = useState("all");
  const [showAlert, setShowAlert] = useState(false);
  const [food, setFood] = useState("");
  const [showCall, setShowCall] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const tableId = localStorage.getItem("tableId");
  const lat = localStorage.getItem("lat");
  const lon = localStorage.getItem("lon");
  const currentTable = tables.filter((c) => c._id == tableId)[0];
  const [msg, setMsg] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

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

  const callOfitsiant = () => {
    const schema = {
      tableId,
      tableName: tables.filter((c) => c._id == tableId)[0].title,
      tableNumber: tables.filter((c) => c._id == tableId)[0].tableNumber,
      agent: {
        lat,
        lon,
      },
    };
    socket.emit("call", schema);
    console.log(schema);

    socket.on("call-response", (data) => {
      console.log(data);
      if (data.msg == "successfully") {
        setMsg(true);
        setStatus("success");
        setMessage(
          "So'rovingiz yetkazildi. Tez orada sizga xizmat ko'rsatishadi"
        );
      } else {
        setMsg(true);
        setStatus("error");
        setMessage("Tizimda hatolik ketti! Iltimos qayta urunib koring");
      }
    });
  };

  return msg ? (
    <MsgBox status={status} message={message} />
  ) : (
    <div className="home relative">
      <Alert
        msg={`Siz savatga ${food.foodName}ni qoshdingiz`}
        className={showAlert}
        setState={setShowAlert}
      />
      {showCall && (
        <div className="call-alert">
          <div className="call-box">
            <div className="call-icon">
              <i className="bi bi-bell-fill"></i>
            </div>
            <h3>Ofitsiyantni chaqirish</h3>
            <p>
              Sizga yordam kerakmi? Ofitsiyantni chaqiring va tez orada xizmat
              ko'rsatiladi.
            </p>
            <div className="call-buttons">
              <button className="cancel-btn" onClick={() => setShowCall(false)}>
                <i className="bi bi-x-circle"></i> Bekor qilish
              </button>
              <button className="confirm-btn" onClick={() => callOfitsiant()}>
                <i className="bi bi-bell"></i> Chaqirish
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="category-box">
        <div className="category-content">
          <div className="logo">KepKet</div>
          <div className="order-header">
            <i className="bi bi-bell" onClick={() => setShowCall(true)}></i>
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
