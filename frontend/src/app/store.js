import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../utils/userSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
  },
});
 