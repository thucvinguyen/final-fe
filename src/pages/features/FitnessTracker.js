import React from "react";
import ExerciseForm from "../../features/exercise/ExerciseForm";
import MealForm from "../../features/meal/MealForm";
import { Box, Grid, Typography } from "@mui/material";
import ExerciseLog from "../../features/exercise/ExerciseLog";
import MealLog from "../../features/meal/MealLog";
import fitnessImg from "../../images/fitness_img.png";

function FitnessTracker() {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Fitness Tracker
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ExerciseForm />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={fitnessImg}
            alt="logo"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MealForm />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mt: 2 }}>
            <ExerciseLog />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mt: 2 }}>
            <MealLog />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FitnessTracker;
