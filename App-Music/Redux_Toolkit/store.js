import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import songSlice from "./songSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    song: songSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;