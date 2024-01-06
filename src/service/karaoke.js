import {
  getKaraokeFailure,
  getKaraokeStart,
  getKaraokeSuccess,
} from "../redux/slice/karaoke-slice";
import axios from "./api";

const KaraokeService = {
  async getKaraoke(dispatch) {
    dispatch(getKaraokeStart());
    try {
      const { data } = await axios.get("/karaoke");
      dispatch(getKaraokeSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getKaraokeFailure());
    }
  },
};

export default KaraokeService;
