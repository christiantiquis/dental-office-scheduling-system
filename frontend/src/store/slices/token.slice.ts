import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  token: "",
};

const TokenSlice = createSlice({
  name: "TOKEN",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    cleartoken: (state) => {
      state.token = "";
    }
  },
});

export const TokenReducer = TokenSlice.reducer;
export const { addToken, cleartoken } = TokenSlice.actions;