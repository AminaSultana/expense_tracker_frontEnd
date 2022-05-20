import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseItems: [],
  amount: 0,
  activatePremiumState: false,
};
const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    addItems(state, action) {
      state.expenseItems = action.payload.data;
      state.amount = action.payload.amount;
    },
    activatePremium(state) {
      state.activatePremiumState = !state.activatePremiumState;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
