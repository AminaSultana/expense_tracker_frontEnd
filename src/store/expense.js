import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenseItems: [], amount: 0 };
const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    addItems(state, action) {
      state.expenseItems=action.payload.data
      state.amount=action.payload.amount
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
