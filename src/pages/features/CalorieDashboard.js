import React from "react";
import BodyMassIndex from "../../components/BodyMassIndex";
import { Box } from "@mui/material";
import CalorieChart from "../../components/CalorieChart";

function CalorieDashboard() {
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
          <BodyMassIndex />
        </Box>
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <CalorieChart />
      </Box>
    </>
  );
}

export default CalorieDashboard;
