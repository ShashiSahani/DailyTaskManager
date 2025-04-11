import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL } from "./api";

export const fetchTasks = createAsyncThunk("tasks/fetchTask", async () => {
  const res = await axios.get(API_URL);
  return res?.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
});
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${API_URL}${id}`);
  return id;
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  const res = await axios.put(`${API_URL}${task._id}`, task);
  return res.data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  },
});
export default taskSlice.reducer;