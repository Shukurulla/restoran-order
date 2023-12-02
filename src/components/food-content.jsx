import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import FoodBox from "./food-box";
import "../App.scss";

const FoodContent = ({ category, foods, addOrder }) => {
  const { orders } = useSelector((state) => state.order);
  const onCategoryFoods = foods.filter((c) => c.category === category);

  return (
    <div className="food-box">
      <div className="food-category">
        <h3 className="text-light navigate">
          {onCategoryFoods.length != 0 && category}
          <Link to={`/category/${category}`}>
            Barchasi <i className="bi bi-arrow-right"></i>
          </Link>
        </h3>
        <div className="foods">
          <Swiper
            slidesPerView={2}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {onCategoryFoods.map((item) => (
              <SwiperSlide>
                <FoodBox
                  item={item}
                  onCategoryFoods={onCategoryFoods}
                  addOrder={addOrder}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FoodContent;
