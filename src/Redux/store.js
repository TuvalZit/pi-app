import { configureStore } from "@reduxjs/toolkit";
import PiSlice from "./Slices/PiSlice";
const store = configureStore({
  reducer: {
    PiSlice: PiSlice,
  },
});
export default store;
