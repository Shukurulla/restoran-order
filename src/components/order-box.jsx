import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addId,
  addOrder,
  addOrderLength,
  addSum,
} from "../redux/slice/order-slice";

const OrderBox = ({ item }) => {
  const [val, setVal] = useState(1);
  const { sum, orders, id, orderLength } = useSelector((state) => state.order);
  const length = orders.filter((c) => c._id === item._id).length;
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  if (val < 1) {
    setVal(1);
  }

  const handleOrder = (food) => {
    dispatch(addId([...id, food._id]));
    dispatch(addSum(sum + food.price));
    dispatch(addOrder([...orders, food]));
  };

  const equalOrders = orders.filter((c) => c._id == item._id);
  const unEqualOrders = orders.filter((c) => c._id !== item._id);
  const deleteOrder = (food) => {
    let result = equalOrders.slice(0, equalOrders.length - 1);
    dispatch(addSum(sum - food.price));
    if (equalOrders.length === 1) {
      setDisabled(true);
    }
    const cancatOrders = unEqualOrders.concat(result);
    dispatch(addOrder(cancatOrders));
  };

  const removeOrder = () => {
    const equalOrders = orders.filter((c) => c._id == item._id);
    const unEqualOrders = orders.filter((c) => c._id !== item._id);
    const unEqualOrderLength = orderLength.filter((c) => c._id !== item._id);
    dispatch(addOrder(unEqualOrders));
    dispatch(addOrderLength(unEqualOrderLength));
    dispatch(addSum(sum - item.price * equalOrders.length));
  };

  return (
    <div className="order-box">
      <i className="bi bi-x-lg" onClick={() => removeOrder()}></i>
      <div className="img-box">
        <img
          src={`https://restoran-service.onrender.com/Images/${item.image}`}
          alt={item.foodName}
          className="w-100"
        />
      </div>
      <div className="order-info">
        <div className="order-title">{item.foodName}</div>
        <div className="order-dosage">
          <span>Miqdori: </span>
          <div className="counter-box">
            <input
              className="btn-update minus bg-dark"
              onClick={() =>
                equalOrders.length > 1 ? deleteOrder(item) : console.log("1")
              }
              value="-"
              style={{ pointerEvents: `${disabled ? "none" : "all"}` }}
              type={"button"}
            />
            <div className="price">{length}</div>
            <div className="btn-update" onClick={() => handleOrder(item)}>
              +
            </div>
          </div>
        </div>
        <div className="order-price">
          {(item.price * length) / 1000 + ".000"} so'm
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
