import {
  getSavedFailure,
  getSavedStart,
  getSavedSuccess,
} from "../redux/slice/saved";
import axios from "./api";
const SavedServeice = {
  async getSaved(dispatch) {
    dispatch(getSavedStart());
    try {
      const { data } = await axios.get("/saved");
      dispatch(getSavedSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getSavedFailure());
    }
  },
};

export default SavedServeice;
