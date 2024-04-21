import React from "react";
import { Box, Typography } from "@mui/material";
import WorkoutList from "../../features/workout/WorkoutList";
import WorkoutSearch from "../../features/workout/WorkoutSearch";

function ExerciseLibrary() {
  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "60%" }}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
            Exercise Library
          </Typography>
          <WorkoutSearch />
        </Box>
      </Box>
      <WorkoutList />
    </Box>
  );
}

export default ExerciseLibrary;
