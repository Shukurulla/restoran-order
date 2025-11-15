import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MsgBox from "../../components/msg-box";
import OrderBox from "../../components/order-box";
import { addOrder, addSum } from "../../redux/slice/order-slice";
import OrderService from "../../service/order";
import "./order.scss";
import Unknown from "./unknown";
import io from "socket.io-client";

const socket = io.connect("https://api.kepket.uz");

const Order = () => {
  const { orders, sum, orderLength } = useSelector((state) => state.order);
  const { tables } = useSelector((state) => state.table);
  const { musics } = useSelector((state) => state.music);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const f = new Intl.NumberFormat("es-DE");
  const { ipAddress } = useSelector((state) => state.user);
  const hour = new Date().getHours();

  const tableId = localStorage.getItem("tableId");
  const tableName = tables?.filter((c) => c._id == tableId)[0]?.title;
  const tableSurcharge = tables?.filter((c) => c._id == tableId)[0]?.surcharge;
  const lat = localStorage.getItem("lat");
  const lon = localStorage.getItem("lon");
  const [unknown, setUnknown] = useState(false);

  const formData = {
    orderedAt: new Date(),
    selectFoods: orderLength,
    allOrders: orders,
    totalPrice: sum,
    agent: {
      lat,
      lon,
    },
    tableId: tableId,
    tableName,
    discount: hour > 11 && hour < 16 ? true : false,
    userInfo: ipAddress,
    surcharge: tableSurcharge,
  };

  const onOrder = async () => {
    if (!lat && !lon) {
      setUnknown(true);
    } else {
      setDisabled(true);
      try {
        socket.emit("post_order", formData);
        socket.on("get_order", (data) => {
          if (data) {
            setMsg(true);
            localStorage.removeItem("lat");
            localStorage.removeItem("lon");
            setStatus("success");
            dispatch(addOrder([]));
            dispatch(addSum([]));
          }
        });
        socket.on("get_message", (data) => {
          if (data.msg == "success") {
            setMsg(true);
            setStatus("success");
            setMessage("Tez Orada buyurtmangiz yetkaziladi");
          }
          if (data.msg == "error") {
            setMsg(true);
            setStatus("error");
            setMessage("Kechirasiz Tizimda xatolik ketti!!");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return msg ? (
    <MsgBox status={status} message={message} />
  ) : (
    <div className="order">
      {unknown && <Unknown setState={setUnknown} />}
      <div className="order-header py-3">
        <p className="m-0 p-0" onClick={() => navigate("/home")}>
          <i className="bi bi-arrow-left"></i>
        </p>
        <Link to={"/home"}>
          <i className="bi bi-list"></i>
        </Link>
      </div>
      <div className="order-content">
        {orderLength.length > 0 && (
          <div className="relative">
            <h4 className="text-light">Ovqatlar</h4>
            {orderLength?.map((item) => (
              <OrderBox item={item} />
            ))}
          </div>
        )}
      </div>

      {orderLength.length == 0 && musics.length == 0 ? (
        <div className="order-msg relative text-light">
          Buyurtmalar mavjud emas
        </div>
      ) : (
        ""
      )}
      <div className="footer-order">
        <div className="order-total-info">
          <div className="service-total"></div>
          <p className="text-danger">
            Bandlik uchun soatiga {f.format(tableSurcharge)} so'm qoshiladi{" "}
          </p>
          {hour > 11 && hour < 15 ? (
            <p className="text-danger">
              Chegirma 10% : Umumiy hisobdan 10% qaytariladi
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="total-price">
          <b className="text-success">
            Umumiy hisob:
            {isNaN(f.format(sum)) ? 0 : f.format(sum)} so'm
          </b>
          <button disabled={disabled} onClick={() => onOrder()}>
            Buyurtma berish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
