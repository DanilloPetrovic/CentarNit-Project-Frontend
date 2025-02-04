import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
