import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ipAddress: null,
  device: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getIpAddress: (state, action) => {
      state.ipAddress = action.payload;
    },
    getDevice: (state, action) => {
      state.device = action.payload;
    },
  },
});

export const { getDevice, getIpAddress } = userSlice.actions;

export default userSlice.reducer;
