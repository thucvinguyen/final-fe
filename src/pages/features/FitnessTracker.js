import React from "react";
import ExerciseForm from "../../features/exercise/ExerciseForm";
import MealForm from "../../features/meal/MealForm";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ExerciseLog from "../../features/exercise/ExerciseLog";
import MealLog from "../../features/meal/MealLog";

function FitnessTracker() {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Fitness Tracker
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ExerciseForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <MealForm />
        </Grid>
      </Grid>
      {/* <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">Message</Typography>
      </Box> */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {/* <Box sx={{ mt: 2 }}>
            <Paper sx={{ padding: 2, mb: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                Total Calories Burned:
              </Typography>
            </Paper>
          </Box> */}
          <Box sx={{ mt: 2 }}>
            <ExerciseLog />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* <Box sx={{ mt: 2 }}>
            <Paper sx={{ padding: 2, mb: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                Total Calories Consumed:
              </Typography>
            </Paper>
          </Box> */}
          <Box sx={{ mt: 2 }}>
            <MealLog />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FitnessTracker;
