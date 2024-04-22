import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useDispatch, useSelector } from "react-redux";
import { getExercises } from "./exerciseSlice";

function ExerciseLog({ userId }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { currentPageExercises, exercisesById, isLoading, totalExercises } =
    useSelector((state) => state.exercise);

  const exercises = currentPageExercises.map(
    (exerciseId) => exercisesById[exerciseId]
  );

  useEffect(() => {
    if (userId) {
      dispatch(getExercises({ userId, page })); // Dispatch getExercises with userId and page
    }
  }, [dispatch, userId, page]);

  return (
    <div>
      {exercises.map((exercise) => (
        <Paper
          sx={{ padding: 2, mb: 2 }}
          key={exercise._id}
          exercise={exercise}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">
              Exercise Name: {exercise.name}
            </Typography>
            <IconButton>
              <DisabledByDefaultIcon />
            </IconButton>
          </Box>
          <Typography variant="body1">
            Total Calories Burned: {exercise.caloriesBurned}
          </Typography>
        </Paper>
      ))}
    </div>
  );
}

export default ExerciseLog;
