import axios from "./api";

const OrderService = {
  async postOrder(order) {
    const { data } = await axios.post("/orders", order);
    return data;
  },
};

export default OrderService;
