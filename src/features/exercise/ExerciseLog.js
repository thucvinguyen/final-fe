import React, { useEffect, useState } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch, useSelector } from "react-redux";
import { deleteExercise, getExercises } from "./exerciseSlice";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/form/Modal";
import { LoadingButton } from "@mui/lab";
import ExerciseEdit from "./ExerciseEdit";
import dayjs from "dayjs";

function ExerciseLog() {
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [exerciseIdToDelete, setExerciseIdToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editExerciseId, setEditExerciseId] = useState(null);

  let userId = auth.user._id;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { currentPageExercises, exercisesById, isLoading, totalExercises } =
    useSelector((state) => state.exercise);

  useEffect(() => {
    dispatch(getExercises({ userId, page }));
  }, [dispatch, userId, page]);

  const exercises = currentPageExercises.map(
    (exerciseId) => exercisesById[exerciseId]
  );

  const handleOpenDeleteModal = (exerciseId) => {
    setShowModal(true);
    setExerciseIdToDelete(exerciseId);
  };

  const handleCloseDeleteModal = () => {
    setShowModal(false);
    setExerciseIdToDelete(null);
  };

  const handleDeleteExercise = () => {
    dispatch(deleteExercise(exerciseIdToDelete));
    handleCloseDeleteModal();
  };

  const handleEditExercise = (exerciseId) => {
    setEditMode(true);
    setEditExerciseId(exerciseId);
  };

  const handleCloseEditForm = () => {
    setEditMode(false);
    setEditExerciseId(null);
  };

  return (
    <div>
      {editMode && editExerciseId && (
        <ExerciseEdit
          exercise={exercisesById[editExerciseId]}
          handleCloseModal={handleCloseEditForm}
          setEditMode={setEditMode}
        />
      )}
      {exercises.map((exercise) => (
        <Paper
          sx={{ padding: 2, mb: 2 }}
          key={exercise._id}
          exercise={exercise}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1">
              Exercise Name: {exercise.name}
            </Typography>
            <Box>
              <IconButton onClick={() => handleEditExercise(exercise._id)}>
                <ModeEditIcon />
              </IconButton>
              <IconButton onClick={() => handleOpenDeleteModal(exercise._id)}>
                <DisabledByDefaultIcon />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="body1">
            Calories Burned: {exercise.caloriesBurned}
          </Typography>
          <Typography variant="body1">
            Date: {dayjs(exercise.date).format("MM/DD/YYYY")}
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
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteExercise}
      />
    </div>
  );
}

export default ExerciseLog;
