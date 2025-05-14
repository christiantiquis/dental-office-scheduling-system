import { combineReducers } from "@reduxjs/toolkit";
import { UserReducer } from "./user.slice";

export const appSlice = combineReducers({
  UserReducer,
});
