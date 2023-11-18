import axios from "./api";

const FoodService = {
  async getFoods() {
    const { data } = await axios.get("/foods");
    return data;
  },
  async postFoods(food) {
    const { data } = await axios.post("/foods", food);
    return data;
  },
  async editFood(id, food) {
    const { data } = await axios.post(`/edit-food/${id}`, food);
    return data;
  },
  async deleteFood(id) {
    const { data } = await axios.post(`/edit-food/${id}`);
    return data;
  },
};

export default FoodService;
