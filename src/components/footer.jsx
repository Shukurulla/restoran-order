import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { sum } = useSelector((state) => state.order);
  const navigate = useNavigate("");
  const f = new Intl.NumberFormat("es-sp");

  return (
    <div className="footer">
      <div className="price-content">
        <i className="bi bi-cart4"></i>
        <span>{sum ? f.format(sum) : "0"} sum</span>
      </div>
      <div className="order-btn">
        <button onClick={() => navigate("/order")}>
          Buyurtmani korish <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Footer;
