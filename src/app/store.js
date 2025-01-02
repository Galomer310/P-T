import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/state/slice";

const store = configureStore({
  reducer: {
    tasksReducer,
  },
});

export default store;
