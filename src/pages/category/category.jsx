import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/alert";
import "./category.scss";
import {
  addId,
  addOrder,
  addOrderLength,
  addSum,
} from "../../redux/slice/order-slice";
import Footer from "../../components/footer";

const Category = () => {
  const { categories } = useSelector((state) => state.category);
  const { foods } = useSelector((state) => state.food);
  const [menu, setMenu] = useState(false);
  const { id, sum, orders } = useSelector((state) => state.order);
  const [searchResult, setSearchResult] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [select, setSelect] = useState("all");
  const [food, setFood] = useState("");

  const { slug } = useParams();
  const categoryFoods =
    slug == "all" ? foods : foods.filter((c) => c.category === slug);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTyping = (val) => {
    setSelect(val.length == 0 && "all");
    setMenu(val && true);
    const data = foods.filter(
      (c) => c.foodName.slice(0, val.length).toLowerCase() == val
    );
    setSearchResult(data);
    console.log(menu);
  };

  const handleOrder = (food) => {
    setShowAlert(true);
    setFood(food);

    dispatch(addId([...id, food._id]));
    dispatch(addSum(sum + food.price));
    dispatch(addOrder([...orders, food]));
  };

  useEffect(() => {
    const generate = orders.filter((c, idx) => c._id !== id[idx - 1]);
    dispatch(addOrderLength(generate));
  }, [food, id]);

  return (
    <div>
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
                        navigate(
                          `/category/${
                            categories.filter(
                              (c) => c.title === item.category
                            )[0].title
                          }`
                        );
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
            <select
              value={slug}
              onChange={(e) => navigate(`/category/${e.target.value}`)}
            >
              <option value="all">Hammasi</option>
              {categories.map((item) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="category-title">{slug}</div>
        {categoryFoods.map((item) => (
          <div className="col-lg-6 col-md-6 col-sm-6 col-6" key={item._id}>
            <div className="food-item h-100" key={item._id}>
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
              <button onClick={() => handleOrder(item)}>
                Qo'shish{" "}
                {`${
                  orders.filter((c) => c._id == item._id).length > 0
                    ? orders.filter((c) => c._id == item._id).length
                    : ""
                }`}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Category;
