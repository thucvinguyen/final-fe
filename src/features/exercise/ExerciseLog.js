import { Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

function ExerciseLog() {
  return (
    <div>
      <Paper sx={{ padding: 2, mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">Exercise Name:</Typography>
          <IconButton>
            <DisabledByDefaultIcon />
          </IconButton>
        </Box>
        <Typography variant="body1">Total Calories Burned:</Typography>
      </Paper>
    </div>
  );
}

export default ExerciseLog;
