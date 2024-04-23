import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { EXERCISES_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  exercises: [],
  exercisesById: {},
  // currentPageExercises: [],
};

const slice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetExercises(state, action) {
      state.exercisesById = {};
      state.currentPageExercises = [];
    },

    createExerciseSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.exercises.push(action.payload);
    },

    getExercisesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { exercises, count } = action.payload;
      exercises.forEach((exercise) => {
        state.exercisesById[exercise._id] = exercise;
        if (!state.currentPageExercises.includes(exercise._id))
          state.currentPageExercises.push(exercise._id);
      });
      state.totalExercises = count;
    },
  },
});

export default slice.reducer;

export const createExercise =
  ({ name, sets, reps }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/exercises", {
        name,
        sets,
        reps,
      });
      dispatch(slice.actions.createExerciseSuccess(response.data));
      toast.success("Exercise added successfully.");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getExercises =
  ({ userId, page = 1, limit = EXERCISES_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/exercises/${userId}`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetExercises());
      dispatch(slice.actions.getExercisesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
