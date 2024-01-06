import {
  getDJServiceFailure,
  getDJServiceStart,
  getDJServiceSuccess,
} from "../redux/slice/dj-slice";
import axios from "./api";
const djService = {
  async getDjService(dispatch) {
    dispatch(getDJServiceStart());
    try {
      const { data } = await axios.get("service-dj");
      dispatch(getDJServiceSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getDJServiceFailure());
    }
  },
};

export default djService;
