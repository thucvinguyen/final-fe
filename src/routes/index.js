import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import AccountPage from "../pages/AccountPage";
import UserProfilePage from "../pages/UserProfilePage";
import ExcerciseLibrary from "../pages/features/ExcerciseLibrary";
import FitnessTracker from "../pages/features/FitnessTracker";
import CalorieDashboard from "../pages/features/CalorieDashboard";
import CommunityExplore from "../pages/CommunityExplore";
import WorkoutDetail from "../features/workout/WorkoutDetail";
import PlanDetail from "../pages/homepage/PlanDetail";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route element={<HomePage />} />
        <Route path="me" element={<CalorieDashboard />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="user/:userId" element={<UserProfilePage />} />
        <Route path="community" element={<CommunityExplore />} />
        <Route
          path="features/exercise-library"
          element={<ExcerciseLibrary />}
        />
        <Route
          path="/features/exercise-library/:id"
          element={<WorkoutDetail />}
        />
        <Route path="features/fitness-tracker" element={<FitnessTracker />} />
        <Route
          path="features/calorie-dashboard"
          element={<CalorieDashboard />}
        />
        <Route path="/subscription" element={<PlanDetail />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
