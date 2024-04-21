// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import apiService from "../../app/apiService";

// const initialState = {
//   isLoading: false,
//   error: null,
//   meals: [],
// };

// const slice = createSlice({
//   name: "meal",
//   initialState,
//   reducers: {
//     startLoading(state) {
//       state.isLoading = true;
//     },
//     hasError(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//     getMealsSuccess(state, action) {
//       state.isLoading = false;
//       state.error = null;
//       const { meals, total, page } = action.payload;
//       state.meals = meals;
//       state.totalMeals = total;
//       state.currentPage = page;
//     },
//     createMealSuccess(state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.meals.push(action.payload);
//     },
//   },
// });

// export default slice.reducer;

// export const createMeal =
//   ({ name, calories }) =>
//   async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await apiService.post("/meals", { name, calories });
//       dispatch(slice.actions.createMealSuccess(response.data));
//       toast.success("Meal added successfully.");
//     } catch (error) {
//       dispatch(slice.actions.hasError(error.message));
//       toast.error(error.message);
//     }
//   };

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "meal",
  initialState,
  reducers: {},
});

export default slice.reducer;
