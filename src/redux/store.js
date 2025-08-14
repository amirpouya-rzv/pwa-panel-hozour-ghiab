import { configureStore } from "@reduxjs/toolkit";
import darkmodeReducer from "./theme/darkmodeslice";

const store = configureStore({
  reducer: {
    darkmode: darkmodeReducer
  }
});

export default store;
