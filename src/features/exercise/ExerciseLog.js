import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useDispatch, useSelector } from "react-redux";
import { deleteExercise, getExercises } from "./exerciseSlice";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/form/Modal";
import { LoadingButton } from "@mui/lab";

function ExerciseLog() {
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [exerciseIdToDelete, setExerciseIdToDelete] = useState(null);

  let userId = auth.user._id;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { currentPageExercises, exercisesById, isLoading, totalExercises } =
    useSelector((state) => state.exercise);
  console.log(exercisesById);
  useEffect(() => {
    dispatch(getExercises({ userId, page }));
  }, [dispatch, userId, page]);

  const exercises = currentPageExercises.map(
    (exerciseId) => exercisesById[exerciseId]
  );

  const handleModalOpen = (exerciseId) => {
    setShowModal(true);
    setExerciseIdToDelete(exerciseId);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setExerciseIdToDelete(null);
  };

  const handleDeleteExercise = () => {
    dispatch(deleteExercise(exerciseIdToDelete));
    handleModalClose();
  };

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
            <IconButton onClick={() => handleModalOpen(exercise._id)}>
              <DisabledByDefaultIcon />
            </IconButton>
          </Box>
          <Typography variant="body1">
            Total Calories Burned: {exercise.caloriesBurned}
          </Typography>
        </Paper>
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalExercises ? (
          <LoadingButton
            variant="contained"
            color="primary"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
          >
            Load More
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Exercise Yet</Typography>
        )}
      </Box>
      <Modal
        sx={{ display: "flex", justifyContent: "center" }}
        open={showModal}
        onClose={handleModalClose}
        onConfirm={handleDeleteExercise}
      />
    </div>
  );
}

export default ExerciseLog;

// import React from "react";

// function ExerciseLog() {
//   return <div>ExerciseLog</div>;
// }

// export default ExerciseLog;
