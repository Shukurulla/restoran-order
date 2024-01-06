import { createSlice } from "@reduxjs/toolkit";

const KaraokeSlice = createSlice({
  name: "karaoke",
  initialState: {
    isLoading: false,
    karaoke: {},
  },
  reducers: {
    getKaraokeStart: (state) => {
      state.isLoading = true;
    },
    getKaraokeSuccess: (state, action) => {
      state.isLoading = false;
      state.karaoke = action.payload;
    },
    getKaraokeFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getKaraokeFailure, getKaraokeStart, getKaraokeSuccess } =
  KaraokeSlice.actions;

export default KaraokeSlice.reducer;
