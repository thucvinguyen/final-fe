import React, { useEffect } from "react";
import BodyMassIndex from "../../components/BodyMassIndex";
import { Box } from "@mui/material";
import CalorieChart from "../../components/CalorieChart";
import { getCurrentUserFull } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function CalorieDashboard() {
  const dispatch = useDispatch();

  const { user, isLoading, error } = useSelector((state) => ({
    user: state.user.updatedProfile,
    isLoading: state.user.isLoading,
    error: state.user.error,
  }));

  useEffect(() => {
    dispatch(getCurrentUserFull());
  }, [dispatch]);

  if (!user) {
    return null;
  }

  // const { weight, height, gender, exercise, meal } = user;

  return (
    <>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "80%" }}>
          <BodyMassIndex user={user} />
        </Box>
      </Box>

      <Box sx={{ mt: 4, mb: 4 }}>
        <CalorieChart user={user} />
      </Box>
    </>
  );
}

export default CalorieDashboard;
