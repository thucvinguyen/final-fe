import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  workouts: [],
  totalWorkouts: 0,
  currentPage: 1,
  totalPages: 1,
};

const slice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getWorkoutsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { workouts, total, page, totalPages } = action.payload;
      state.workouts = workouts;
      state.totalWorkouts = total;
      state.currentPage = page;
      state.totalPages = totalPages;
    },
  },
});

export default slice.reducer;

export const getWorkouts =
  ({ page = 1, limit = 10 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page,
        limit,
      };
      // if (filterName) params.name = filterName;
      const response = await apiService.get("/workouts", {
        params,
      });
      // Dispatch the success action with fetched data
      dispatch(slice.actions.getWorkoutsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const searchWorkoutsByName = (name) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/workouts/${name}`);
    dispatch(slice.actions.getWorkoutsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
