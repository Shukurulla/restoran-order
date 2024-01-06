import { createSlice } from "@reduxjs/toolkit";

const ofitsiantSlice = createSlice({
  name: "ofitsiant",
  initialState: {
    isLoading: false,
    ofitsiantService: [],
  },
  reducers: {
    getOfitsiantServiceStart: (state) => {
      state.isLoading = true;
    },
    getOfitsiantServiceSuccess: (state, action) => {
      state.isLoading = false;
      state.ofitsiantService = action.payload;
    },
    getOfitsiantServiceFailure: (state) => {
      state.isLoading = false;
    },
  },
});
export const {
  getOfitsiantServiceFailure,
  getOfitsiantServiceStart,
  getOfitsiantServiceSuccess,
} = ofitsiantSlice.actions;

export default ofitsiantSlice.reducer;
