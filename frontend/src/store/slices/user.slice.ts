import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../interfaces/user.interface";

export const initialState: IUser = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return { ...initialState };
    },
  },
});

export const UserReducer = UserSlice.reducer;
export const { setUser, clearUser } = UserSlice.actions;
