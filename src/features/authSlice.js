import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: {},
  },
  reducers: {
    authReducer: (state, action) => {
      state.value += 1;
    },
  },
});

export const { authReducer } = authSlice.actions;

export default authSlice.reducer;
