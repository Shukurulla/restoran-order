import {
  getOfitsiantServiceFailure,
  getOfitsiantServiceStart,
  getOfitsiantServiceSuccess,
} from "../redux/slice/ofitsiant-slice";
import axios from "./api";
const OfitsiantService = {
  async getOfitsiant(dispatch) {
    dispatch(getOfitsiantServiceStart());
    try {
      const { data } = await axios.get("/services");
      dispatch(getOfitsiantServiceSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getOfitsiantServiceFailure());
    }
  },
};

export default OfitsiantService;
