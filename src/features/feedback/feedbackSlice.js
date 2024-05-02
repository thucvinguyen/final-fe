import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  feedbacks: [],
  feedbacksById: {},
  currentPageFeedbacks: [],
};

const slice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetFeedbacks(state, action) {
      state.feedbacksById = {};
      state.currentPageFeedbacks = [];
    },

    createFeedbackSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.feedbacks.push(action.payload);
    },
  },
});

export default slice.reducer;

export const createFeedback =
  ({ rating, message }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/feedbacks", {
        rating,
        message,
      });
      dispatch(slice.actions.createFeedbackSuccess(response.data));
      toast.success("Feedback added successfully.");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
