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
          src={`https://spng.pngfind.com/pngs/s/73-734350_food-dish-top-view-png-food-banner-psd.png`}
          alt=""
        />
      </div>
      <div className="food-info">
        <h4>{item.foodName}</h4>
        <div className="row text-start">
          <span className="col-3">narxi: </span>
          <span className="col-9 text-end ">
            {item.price / 1000 + ".000"} so'm
          </span>
        </div>
        <p className="pt-2">Lorem, ipsum dolor sit amet consectetur </p>
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
