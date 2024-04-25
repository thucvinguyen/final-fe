import React from "react";
import { Typography, Paper, Divider, Grid, Chip } from "@mui/material";

function WorkoutList({ workout }) {
  return (
    <>
      <Paper style={{ width: "30%", padding: "10px" }} sx={{ mt: 4, ml: 3 }}>
        <Typography
          variant="h5"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {workout.name}
        </Typography>
        <Divider />
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Grid item>
            <Chip label={`${workout.part}`} variant="outlined" />
          </Grid>
          <Grid item>
            <Chip label={`${workout.equipment}`} variant="outlined" />
          </Grid>
          <Grid item>
            <Chip label={`${workout.level}`} variant="outlined" />
          </Grid>
          <Grid item>
            <Chip label={`${workout.type}`} variant="outlined" />
          </Grid>
        </Grid>
        <Typography sx={{ mt: 1 }}>{workout.description}</Typography>
      </Paper>
    </>
  );
}

export default WorkoutList;
