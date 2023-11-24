import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MsgBox from "../../components/msg-box";
import OrderBox from "../../components/order-box";
import { addOrder, addSum } from "../../redux/slice/order-slice";
import OrderService from "../../service/order";

const Order = () => {
  const { orders, sum, id, orderLength } = useSelector((state) => state.order);
  const { tables } = useSelector((state) => state.table);
  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);
  const [status, setStatus] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const dispatch = useDispatch();
  const [isWarning, setIsWarning] = useState(false);

  const tableId = localStorage.getItem("tableId");
  const tableName = tables?.filter((c) => c._id == tableId)[0]?.title;

  const auth = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    }
  };

  const formData = {
    orderedAt: new Date(),
    selectFoods: orderLength,
    allOrders: orders,
    totalPrice: sum + sum * 0.15,
    location: {
      lat,
      lon,
    },

    tableId: tableId,
    tableName,
  };

  if (!orderLength.length) {
    navigate("/");
  }

  useEffect(() => {
    auth();
    console.log(tableName);
  }, [!isWarning]);

  const onOrder = async () => {
    if (lat.length == 0 && lon.length == 0) {
      const warning = confirm("Joylashuvga ruxsat berishingiz kerak");
      if (warning) {
        setIsWarning(true);
        navigate("/");
        window.location.reload();
      }
    } else if (tableName === undefined) {
      alert("Bunday stol topilmadi!! Iltimos QR Codni qaytadan skanerlan");
    } else {
      const { data } = await OrderService.postOrder(formData);
      if (data) {
        setMsg(true);
        setStatus("success");
        dispatch(addOrder([]));
        dispatch(addSum([]));
      }
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
      <div className="order-content">
        {orderLength ? (
          orderLength?.map((item) => <OrderBox item={item} />)
        ) : (
          <p>Buyurtmalar mavjud emas</p>
        )}
      </div>
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
