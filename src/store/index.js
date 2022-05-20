import { configureStore } from "@reduxjs/toolkit";

import darkModeReducer from "./darkModeReducer";
import authReducer from './auth'
import expenseReducer from './expense'

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, darkMode: darkModeReducer},
});

export default store;
