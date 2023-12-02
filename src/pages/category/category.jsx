import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getCategory = async () => {
      dispatch(getCategoryStart());
      try {
        const { data } = await CategoryService.getCategory();
        dispatch(getCategorySuccess(data));
      } catch (error) {
        console.log(error);
        dispatch(getCategoryFailure());
      }
    };
    const getFoods = async () => {
      dispatch(getFoodStart());
      try {
        const { data } = await FoodService.getFoods();
        dispatch(getFoodSuccess(data));
      } catch (error) {
        console.log(error);
        dispatch(getFoodFailure());
      }
    };

    getCategory();
    getFoods();
  }, []);
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
    slug == "all" ? foods : foods?.filter((c) => c.category === slug);

  const handleOrder = (food) => {
    setShowAlert(true);

    setFood(food);
    dispatch(addId([...id, food._id]));
    const totalSum = eval(orders.map((i) => i.price).join("+"));
    dispatch(addSum(totalSum));
    dispatch(addOrder([...orders, food]));
  };

  useEffect(() => {
    const generate = orders.filter((c, idx) => c._id !== id[idx - 1]);
    dispatch(addOrderLength(generate));
    const totalSum = eval(orders.map((i) => i.price).join("+"));
    dispatch(addSum(totalSum));
  }, [food, id, orders]);
  useEffect(() => {
    const generate = orders.filter((c, idx) => c._id !== id[idx - 1]);
    dispatch(addOrderLength(generate));
  }, [food, id]);

  const f = new Intl.NumberFormat("es-sp");

  return (
    <div>
      <Alert
        msg={`Siz savatga ${food.foodName}ni qoshdingiz`}
        className={showAlert}
        setState={setShowAlert}
      />
      <div className="category-box">
        <div className="category-box">
          <div className="category-content">
            <div
              className="bi bi-arrow-left"
              onClick={() => navigate("/")}
            ></div>
            <div className="logo">Logo</div>
            <i className="bi bi-bag" onClick={() => navigate("/order")}>
              {" "}
              {orders.length > 0 && <span>{orders.length}</span>}
            </i>
          </div>
        </div>
      </div>
      <div className="category-content">
        <div
          className="categories"
          style={{ width: categories.length * 25 + "%" }}
        >
          <div
            className={`category-item ${slug == "all" ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            <img
              src="https://spng.pngfind.com/pngs/s/73-734350_food-dish-top-view-png-food-banner-psd.png"
              alt=""
            />
            Hammasi
          </div>
          {categories.map((item) => (
            <div
              className={`category-item ${slug == item.title ? "active" : ""}`}
              key={item._id}
              onClick={() => navigate(`/category/${item.title}`)}
            >
              <img
                src={`https://restoran-service.onrender.com/Images/${
                  foods?.filter((c) => c.category === item?.title)[0]?.image
                }`}
                alt=""
              />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="row pb-6">
        <div className="category-title ">
          {slug === "all" ? "Hammasi" : slug}
        </div>
        {categoryFoods.map((item) => (
          <div className="col-lg-6 col-md-6 col-sm-6 col-6 mb-2" key={item._id}>
            <div className="food-item h-100" key={item._id}>
              <div className="food-img">
                <img
                  src={`https://restoran-service.onrender.com/Images/${item.image}`}
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="food-info">
                <h4>{item.foodName}</h4>
                <div className="row text-start">
                  <span className="col-3">narxi: </span>
                  <span className="col-9 text-end ">
                    {f.format(item.price)} so'm
                  </span>
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
