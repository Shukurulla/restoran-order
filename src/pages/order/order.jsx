import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MsgBox from "../../components/msg-box";
import OrderBox from "../../components/order-box";
import { addOrder, addSum } from "../../redux/slice/order-slice";
import OrderService from "../../service/order";

const Order = () => {
  const { orders, sum, orderLength } = useSelector((state) => state.order);
  const { tables } = useSelector((state) => state.table);

  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const f = new Intl.NumberFormat("es-DE");

  const tableId = localStorage.getItem("tableId");
  const tableName = tables?.filter((c) => c._id == tableId)[0]?.title;

  const formData = {
    orderedAt: new Date(),
    selectFoods: orderLength,
    allOrders: orders,
    totalPrice: sum + sum * 0.15,

    tableId: tableId,
    tableName,
  };

  if (!orderLength.length) {
    navigate("/");
  }

  const onOrder = async () => {
    setDisabled(true);
    try {
      const { data } = await OrderService.postOrder(formData);
      if (data) {
        setMsg(true);
        setStatus("success");
        dispatch(addOrder([]));
        dispatch(addSum([]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return msg ? (
    <MsgBox status={status} />
  ) : (
    <div className="order">
      <div className="order-header py-3">
        <p className="m-0 p-0" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left"></i>
        </p>
        <Link to={"/"}>
          <i className="bi bi-list"></i>
        </Link>
      </div>
      <div className="order-content">
        {orderLength.length > 0 ? (
          orderLength?.map((item) => <OrderBox item={item} />)
        ) : (
          <div className="result">
            <p>Buyurtmalar mavjud emas</p>
            <button onClick={() => navigate("/")}>Buyurtma berish</button>
          </div>
        )}
      </div>
      <div className="footer-order">
        <div className="order-total-info">
          <div className="service-total">
            <b>Hizmat korsatish narxi: </b>
            <span className="">
              {isNaN(f.format(sum * 0.15)) ? 0 : f.format(sum * 0.15)} so'm
            </span>
          </div>
          <p className="text-danger">
            Bandlik uchun soatiga 10.000 so'm qoshiladi{" "}
          </p>
        </div>
        <div className="total-price">
          <b className="text-success">
            Umumiy hisob:{" "}
            {isNaN(f.format(sum + sum * 0.15)) ? 0 : f.format(sum + sum * 0.15)}{" "}
            so'm
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
