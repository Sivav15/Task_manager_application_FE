import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    tasksReducer: (state, { payload }) => {
      state.tasks = payload;
    },
  },
});

export const { tasksReducer } = tasksSlice.actions;

export default tasksSlice.reducer;
