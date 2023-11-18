import React from "react";
import { useSelector } from "react-redux";

const FoodContent = ({ category, foods, addOrder }) => {
  const { orders } = useSelector((state) => state.order);
  const onCategoryFoods = foods.filter((c) => c.category === category);

  return (
    <div className="food-box">
      <div className="food-category">
        <h3>{onCategoryFoods.length != 0 && category}</h3>
        <div className="foods">
          <div
            className="foods-box"
            style={{ width: onCategoryFoods.length * 50 + "%" }}
          >
            {onCategoryFoods.map((item) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodContent;
