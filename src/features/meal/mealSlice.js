import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
// import { MEALS_PER_PAGE } from "../../app/config";

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
      const newMeal = action.payload;
      state.mealsById[newMeal._id] = newMeal;
      state.currentPageMeals.unshift(newMeal._id);
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
      const updatedMeal = action.payload;
      state.mealsById[updatedMeal._id] = updatedMeal;
    },
  },
});

export default slice.reducer;

export const createMeal =
  ({ name, calories, date }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/meals", {
        name,
        calories,
        date,
      });
      dispatch(slice.actions.createMealSuccess(response.data));
      toast.success("Meal Added Successfully.");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getMeals =
  ({ userId, page = 1 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page };
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
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editMeal = (id, data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const name = data.name;
    const calories = data.calories;
    const date = data.date;

    const response = await apiService.put(`/meals/${id}`, {
      name,
      calories,
      date,
    });
    dispatch(
      slice.actions.editMealSuccess({
        ...response.data,
        id,
      })
    );
    toast.success("Update meal successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
