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
          src={`https://restoran-service.onrender.com/Images/${item.image}`}
          alt=""
        />
      </div>
      <div className="food-info">
        <div className="navigate">
          <h4>{item.foodName}</h4>
        </div>
        <div className="d-flex mt-2 justify-content-between align-items-center text-start">
          <span className="text-orange ">
            <i className="bi bi-currency-dollar"></i> Narxi:{" "}
          </span>
          <span className="text-end ">{item.price / 1000 + ".000"} so'm</span>
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
