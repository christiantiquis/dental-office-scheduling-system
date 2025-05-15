import { combineReducers } from "@reduxjs/toolkit";
import { UserReducer } from "./user.slice";
import { AppointmentReducer } from "./appointment.slice";

export const appSlice = combineReducers({
  UserReducer,
  AppointmentReducer,
});
