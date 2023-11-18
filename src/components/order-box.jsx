import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSum } from "../redux/slice/order-slice";

const OrderBox = ({ item }) => {
  const [val, setVal] = useState(1);
  const { sum, orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const totalPrice = item.price * +val;
  if (val < 1) {
    setVal(1);
  }

  useEffect(() => {}, [val]);

  return (
    <div className="order-box">
      <div className="img-box">
        <img
          src={`http://localhost:2001/Images/${item.image}`}
          alt={item.foodName}
          className="w-100"
        />
      </div>
      <div className="order-info">
        <div className="order-title">{item.foodName}</div>
        <div className="order-dosage">
          <span>Miqdori: </span>
          <div className="counter-box">
            <div className="btn-minus">+</div>
            <div className="price"></div>
          </div>
        </div>
        <div className="order-price">{totalPrice}</div>
      </div>
    </div>
  );
};

export default OrderBox;
