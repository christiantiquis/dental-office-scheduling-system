import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IAppointment } from "@/interfaces/appointment.interface";

export const initialState: Partial<IAppointment> = {
  id: "",
};

const AppointmentSlice = createSlice({
  name: "Appointment",
  initialState,
  reducers: {
    setAppointment: (state, action: PayloadAction<IAppointment>) => {
      return { ...state, ...action.payload };
    },
    clearAppointment: () => {
      return { ...initialState };
    },
  },
});

export const AppointmentReducer = AppointmentSlice.reducer;
export const { setAppointment, clearAppointment } = AppointmentSlice.actions;
