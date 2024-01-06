import { createSlice } from "@reduxjs/toolkit";

const djSlice = createSlice({
  name: "dj-service",
  initialState: {
    isLoading: false,
    djService: [],
  },
  reducers: {
    getDJServiceStart: (state) => {
      state.isLoading = true;
    },
    getDJServiceSuccess: (state, action) => {
      state.isLoading = false;
      state.djService = action.payload;
    },
    getDJServiceFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getDJServiceFailure, getDJServiceStart, getDJServiceSuccess } =
  djSlice.actions;

export default djSlice.reducer;
