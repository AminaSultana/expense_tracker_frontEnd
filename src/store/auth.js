import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const userEmail = localStorage.getItem("email")
const isLoggedIn = !!initialToken;

const initialState = { token: initialToken, isLoggedIn: isLoggedIn, userEmail: userEmail };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
      console.log("");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
