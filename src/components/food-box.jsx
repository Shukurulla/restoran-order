import React from "react";
import { useSelector } from "react-redux";

const FoodBox = ({ item, onCategoryFoods, addOrder }) => {
  const { orders } = useSelector((state) => state.order);
  const hour = new Date().getHours();
  const f = new Intl.NumberFormat("es-sp");

  return (
    <div
      className="food-item"
      style={{ width: onCategoryFoods.length == 1 && "100%" }}
      key={item._id}
    >
      <div className="food-img">
        <img src={item.image} alt="" />
      </div>
      <div className="food-info">
        <div className="navigate">
          <h5 className="p-0 m-0">{item.foodName}</h5>
        </div>
        <div className="d-flex mt-2 justify-content-between align-items-center text-start"></div>
        <div className="d-flex mt-2 justify-content-between align-items-center text-start">
          <span className="text-orange ">Narxi: </span>

          <span className="text-end">{f.format(item.price)}so'm</span>
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
