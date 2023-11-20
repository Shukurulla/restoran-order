import React from "react";
import { useSelector } from "react-redux";

const FoodBox = ({ item, onCategoryFoods, addOrder }) => {
  const { orders } = useSelector((state) => state.order);
  return (
    <div
      className="food-item"
      style={{ width: onCategoryFoods.length == 1 && "100%" }}
      key={item._id}
    >
      <div className="food-img">
        <img
          src={`http://localhost:2001/Images/${item.image}`}
          className="w-100"
          alt=""
        />
      </div>
      <div className="food-info">
        <h4>{item.foodName}</h4>
        <div className="row text-start">
          <span className="col-3">narxi: </span>
          <span className="col-9 text-end ">{item.price} so'm</span>
        </div>
      </div>
      <button onClick={() => addOrder(item)}>
        Qo'shish{" "}
        {`${
          orders.filter((c) => c._id == item._id).length > 0
            ? orders.filter((c) => c._id == item._id).length
            : ""
        }`}
      </button>
    </div>
  );
};

export default FoodBox;
