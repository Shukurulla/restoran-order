import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tables: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    getTables: (state, action) => {
      state.tables = action.payload;
    },
  },
});

export const { getTables } = tableSlice.actions;

export default tableSlice.reducer;
