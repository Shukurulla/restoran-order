import React from "react";
import { useSelector } from "react-redux";
import FoodBox from "./food-box";

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
              <FoodBox
                item={item}
                onCategoryFoods={onCategoryFoods}
                addOrder={addOrder}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodContent;
