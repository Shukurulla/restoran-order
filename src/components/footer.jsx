import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { sum } = useSelector((state) => state.order);
  const navigate = useNavigate("");
  return (
    <div className="footer">
      <div className="price-content">
        <i className="bi bi-cart4"></i>
        <span>{sum} sum</span>
      </div>
      <div className="order-btn">
        <button onClick={() => navigate("/order")}>Buyurtmani korish</button>
      </div>
    </div>
  );
};

export default Footer;