import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import tasksReducer from "../features/tasksSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});
