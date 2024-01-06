import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    isLoading: false,
    musicData: [],
    musics: [],
    price: 0,
  },
  reducers: {
    getMusicStart: (state) => {
      state.isLoading = true;
    },
    getMusicSuccess: (state, action) => {
      state.isLoading = false;
      state.musicData = action.payload;
    },
    getMusicFailure: (state) => {
      state.isLoading = false;
    },
    addMusic: (state, action) => {
      state.musics = action.payload;
    },
    addPrice: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const {
  addMusic,
  addPrice,
  getMusicFailure,
  getMusicStart,
  getMusicSuccess,
} = musicSlice.actions;

export default musicSlice.reducer;
