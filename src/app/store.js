import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import exerciseReducer from "../features/exercise/exerciseSlice";
import workoutReducer from "../features/workout/workoutSlice";
import mealReducer from "../features/meal/mealSlice";
import feedbackReducer from "../features/feedback/feedbackSlice";

const rootReducer = combineReducers({
  user: userReducer,
  exercise: exerciseReducer,
  meal: mealReducer,
  workout: workoutReducer,
  feedback: feedbackReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
