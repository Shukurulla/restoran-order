import axios from "./api";
const TableService = {
  async getTable() {
    const { data } = await axios.get("/tables");
    return data;
  },
};

export default TableService;
