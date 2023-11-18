import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodContent from "../../components/food-content";
import Footer from "../../components/footer";
import Alert from "../../components/alert";
import { addOrder, addSum } from "../../redux/slice/order-slice";

const Home = () => {
  const { categories } = useSelector((state) => state.category);
  const { foods } = useSelector((state) => state.food);
  const { orders, sum } = useSelector((state) => state.order);

  const [select, setSelect] = useState("all");
  const [showAlert, setShowAlert] = useState(false);
  const [food, setFood] = useState("");
  const [menu, setMenu] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const dispatch = useDispatch();

  const byCategory =
    select == "all" ? categories : categories.filter((c) => c.title == select);
  const byFood =
    select == "all" ? foods : foods.filter((c) => c.category == select);

  const handleOrder = (food) => {
    setShowAlert(true);
    setFood(food);
    dispatch(addOrder([...orders, food]));
    dispatch(addSum(sum + food.price));
  };

  const onTyping = (val) => {
    setSelect(val.length == 0 && "all");
    setMenu(val && true);
    const data = foods.filter(
      (c) => c.foodName.slice(0, val.length).toLowerCase() == val
    );
    setSearchResult(data);
  };

  return (
    <div className="home">
      <Alert
        msg={`siz savatga ${food.foodName}ni qoshdingiz`}
        className={showAlert}
        setState={setShowAlert}
      />
      <div className="category-box">
        <div className="category-content">
          <div className="search-box">
            <input
              type="text"
              onChange={(e) => onTyping(e.target.value)}
              placeholder="Taom nomini kiriting"
              id="search"
            />
            <label htmlFor="search">
              <i className="bi bi-search"></i>
            </label>

            {menu && (
              <div className="result">
                {searchResult.length !== 0 ? (
                  searchResult.map((item) => (
                    <div
                      className="menu-items"
                      key={item._id}
                      onClick={() => {
                        setSelect(item.category);
                        setMenu(false);
                      }}
                    >
                      {item.foodName}
                      <i className="bi bi-chevron-right"></i>
                    </div>
                  ))
                ) : (
                  <div className="menu-items">Hech narsa topilmadi</div>
                )}
              </div>
            )}
          </div>
          <div className="category-box">
            <select onChange={(e) => setSelect(e.target.value)}>
              <option value="all" selected>
                Hammasi
              </option>
              {categories.map((item) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="food-box">
        {byCategory.map((item) => (
          <FoodContent
            category={item.title}
            addOrder={handleOrder}
            foods={byFood}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
