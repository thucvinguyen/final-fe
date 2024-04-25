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
  ({ page = 1, limit = 10, ...params }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await apiService.get(`/workouts?${queryParams}`, {
        params: { page, limit },
      });
      dispatch(slice.actions.getWorkoutsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

// export const searchWorkoutsByName = (name) => async (dispatch) => {
//   dispatch(slice.actions.startLoading());
//   try {
//     const response = await apiService.get(`/workouts/${name}`);
//     dispatch(slice.actions.getWorkoutsSuccess(response.data));
//   } catch (error) {
//     dispatch(slice.actions.hasError(error.message));
//     toast.error(error.message);
//   }
// };
