import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from "./slice";

export const store = configureStore({
  reducer: {
    employeeDetail: employeeReducer,
  },
});
