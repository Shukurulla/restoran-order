import axios from "./api";
const discountService = {
  async getDiscount() {
    const { data } = await axios.get("/discount");
    return data;
  },
};

export default discountService;
