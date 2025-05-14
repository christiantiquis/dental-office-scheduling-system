import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./slices";

const store = configureStore({
  reducer: appSlice, // Add your reducers hereleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
