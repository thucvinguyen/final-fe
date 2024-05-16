import React, { useEffect } from "react";
import BodyMassIndex from "../../components/BodyMassIndex";
import { Box, Typography } from "@mui/material";
import CalorieChart from "../../components/CalorieChart";
import { getCurrentUserFull } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";

function CalorieDashboard() {
  const dispatch = useDispatch();

  // const { user, isLoading, error } = useSelector((state) => ({
  //   user: state.user.updatedProfile,
  //   isLoading: state.user.isLoading,
  //   error: state.user.error,
  // }));

  const { updatedProfile, isLoading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getCurrentUserFull());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoadingScreen />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error.message || "Something went wrong. Please try again later."}
        </Typography>
      </Box>
    );
  }

  if (!updatedProfile) {
    return null;
  }

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
          <BodyMassIndex user={updatedProfile} />
        </Box>
      </Box>

      <Box sx={{ mt: 4, mb: 4 }}>
        <CalorieChart user={updatedProfile} />
      </Box>
    </>
  );
}

export default CalorieDashboard;
