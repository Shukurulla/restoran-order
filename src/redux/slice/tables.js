import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tables: [],
  tableId: "",
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    getTables: (state, action) => {
      state.tables = action.payload;
    },
    setTableId: (state, action) => {
      state.tableId = action.payload;
    },
  },
});

export const { getTables, setTableId } = tableSlice.actions;

export default tableSlice.reducer;
