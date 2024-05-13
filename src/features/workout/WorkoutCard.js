import React, { useState } from "react";
import {
  Typography,
  Paper,
  Divider,
  Grid,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import WorkoutModal from "./WorkoutModal";

function WorkoutCard({ workout }) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddExercise = () => {
    setShowModal(true);
  };

  return (
    <>
      <Paper
        style={{ width: "30%", padding: "10px" }}
        sx={{
          mt: 4,
          ml: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={handleClick}>
            <ControlPointIcon />
          </IconButton>
        </Box>
        <Divider />
        <Typography
          variant="h5"
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        >
          {workout.name}
        </Typography>

        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Grid item>
            <Chip label={workout.part} variant="outlined" />
          </Grid>
          <Grid item>
            <Chip label={workout.equipment} variant="outlined" />
          </Grid>
          <Grid item>
            <Chip label={workout.level} variant="outlined" />
          </Grid>
        </Grid>
        <Typography sx={{ mt: 1 }}>{workout.description}</Typography>
      </Paper>
      <WorkoutModal
        sx={{ display: "flex", justifyContent: "center" }}
        open={showModal}
        onClose={handleCloseModal}
        onConfirm={handleAddExercise}
        workoutName={workout.name}
      />
    </>
  );
}

export default WorkoutCard;
