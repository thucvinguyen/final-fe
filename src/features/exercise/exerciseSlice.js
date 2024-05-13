import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
// import { EXERCISES_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  exercises: [],
  exercisesById: {},
  currentPageExercises: [],
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
      const newExercise = action.payload;
      state.exercisesById[newExercise._id] = newExercise;
      state.currentPageExercises.unshift(newExercise._id);
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
    deleteExerciseSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { id } = action.payload;
      delete state.exercisesById[id];
      state.currentPageExercises = state.currentPageExercises.filter(
        (exerciseId) => exerciseId !== id
      );
    },

    editExerciseSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedExercise = action.payload;
      state.exercisesById[updatedExercise._id] = updatedExercise;
    },
  },
});

export default slice.reducer;

export const createExercise =
  ({ name, sets, reps, date }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/exercises", {
        name,
        sets,
        reps,
        date,
      });
      dispatch(slice.actions.createExerciseSuccess(response.data));
      toast.success("Exercise added successfully.");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getExercises =
  ({ userId, page = 1 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page };
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

export const deleteExercise = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/exercises/${id}`);
    dispatch(slice.actions.deleteExerciseSuccess({ ...response.data, id }));
    toast.success("Exercise deleted successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editExercise = (id, data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const name = data.name;
    const sets = data.sets;
    const reps = data.reps;
    const date = data.date;

    const response = await apiService.put(`/exercises/${id}`, {
      name,
      sets,
      reps,
      date,
    });
    dispatch(
      slice.actions.editExerciseSuccess({
        ...response.data,
        id,
      })
    );
    toast.success("Update exercise successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
