import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import apiService from "../../app/apiService";
// import { EXERCISES_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  exercises: [],
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null; // Reset error when loading starts
    },
    exercisesLoaded(state, action) {
      state.isLoading = false;
      state.exercises = action.payload;
    },
    exerciseError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // You can add more reducers for other actions related to exercises
  },
});

export const { startLoading, exercisesLoaded, exerciseError } =
  exerciseSlice.actions;

export default exerciseSlice.reducer;
