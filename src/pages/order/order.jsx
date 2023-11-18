import React from "react";
import { useSelector } from "react-redux";
import OrderBox from "../../components/order-box";

const Order = () => {
  const { orders, sum } = useSelector((state) => state.order);
  return (
    <div className="order">
      <div className="order-header">
        <p>Logo</p>
      </div>
      {orders.map((item) => (
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
        </div>
      </div>
    </div>
  );
};

export default Order;
