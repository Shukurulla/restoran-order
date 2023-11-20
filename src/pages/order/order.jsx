import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MsgBox from "../../components/msg-box";
import OrderBox from "../../components/order-box";
import OrderService from "../../service/order";

const Order = () => {
  const { orders, sum, id, orderLength } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);
  const [status, setStatus] = useState("");

  const formData = {
    orderedAt: new Date(),
    selectFoods: orderLength,
    allOrders: orders,
    location: {
      lat: localStorage.getItem("lat"),
      lon: localStorage.getItem("lon"),
    },
    tableId: localStorage.getItem("tableId"),
  };

  if (!orderLength.length) {
    navigate("/");
  }

  const onOrder = async () => {
    try {
      const { data } = await OrderService.postOrder(formData);
      if (data) {
        setStatus("success");
        setMsg(!msg);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setStatus("failure");
      setMsg(!msg);
    }
  };

  return msg ? (
    <MsgBox status={status} />
  ) : (
    <div className="order">
      <div className="order-header py-3">
        <p className="m-0 p-0">Logo</p>
        <Link to={"/"}>
          <i className="bi bi-list"></i>
        </Link>
      </div>
      {orderLength?.map((item) => (
        <OrderBox item={item} />
      ))}
      <div className="footer-order">
        <div className="order-total-info">
          <div className="service-total">
            <b>Hizmat korsatish narxi: </b>
            <span className="">{sum * 0.15}</span>
          </div>
          <p className="text-danger">
            Bandlik uchun soatiga 10000 sum qoshiladi{" "}
          </p>
        </div>
        <div className="total-price">
          <b className="text-success">Umumiy hisob: {sum + sum * 0.15}</b>
          <button onClick={() => onOrder()}>Buyurtma berish</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
