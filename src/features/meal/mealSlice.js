import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { MEALS_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  meals: [],
  mealsById: {},
  currentPageMeals: [],
};

const slice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetMeals(state, action) {
      state.mealsById = {};
      state.currentPageMeals = [];
    },
    createMealSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.meals.push(action.payload);
    },
    getMealsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { meals, count } = action.payload;
      meals.forEach((meal) => {
        state.mealsById[meal._id] = meal;
        if (!state.currentPageMeals.includes(meal._id))
          state.currentPageMeals.push(meal._id);
      });
      state.totalMeals = count;
    },
    deleteMealSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { id } = action.payload;
      delete state.mealsById[id];
      state.currentPageMeals = state.currentPageMeals.filter(
        (mealId) => mealId !== id
      );
    },
    editMealSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { id } = action.payload;
      state.mealsById[id] = {
        ...state.mealsById[id],
        name: action.payload.name,
        calories: action.payload.calories,
      };
    },
  },
});

export default slice.reducer;

export const createMeal =
  ({ name, calories }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/meals", { name, calories });
      dispatch(slice.actions.createMealSuccess(response.data));
      toast.success("Meal Added Successfully.");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getMeals =
  ({ userId, page = 1, limit = MEALS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/meals/${userId}`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetMeals());
      dispatch(slice.actions.getMealsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteMeal = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/meals/${id}`);
    dispatch(slice.actions.deleteMealSuccess({ ...response.data, id }));
    toast.success("Meal deleted successfully");
    // dispatch(getCurrentUserProfile());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editPost = (id, data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const content = data.content;
    const response = await apiService.put(`/posts/${id}`, {
      content,
    });
    dispatch(slice.actions.editPostSuccess({ ...response.data, id }));
    toast.success("Update post successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
