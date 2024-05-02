import React, { useEffect, useState } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { deleteMeal, getMeals } from "./mealSlice";
import Modal from "../../components/form/Modal";
import { LoadingButton } from "@mui/lab";
import MealEdit from "./MealEdit";

function MealLog() {
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [mealIdToDelete, setMealIdToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editMealId, setEditMealId] = useState(null);

  let userId = auth.user._id;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { currentPageMeals, mealsById, isLoading, totalMeals } = useSelector(
    (state) => state.meal
  );

  useEffect(() => {
    dispatch(getMeals({ userId, page }));
  }, [dispatch, userId, page]);

  const meals = currentPageMeals.map((mealId) => mealsById[mealId]);

  const handleOpenDeleteModal = (mealId) => {
    setShowModal(true);
    setMealIdToDelete(mealId);
  };

  const handleCloseDeleteModal = () => {
    setShowModal(false);
    setMealIdToDelete(null);
  };

  const handleDeleteMeal = () => {
    dispatch(deleteMeal(mealIdToDelete));
    handleCloseDeleteModal();
  };

  const handleEditMeal = (mealId) => {
    setEditMode(true);
    setEditMealId(mealId);
  };

  const handleCloseEditForm = () => {
    setEditMode(false);
    setEditMealId(null);
  };

  return (
    <div>
      {editMode && editMealId && (
        <MealEdit
          meal={mealsById[editMealId]}
          handleCloseModal={handleCloseEditForm}
          setEditMode={setEditMode}
        />
      )}
      {meals.map((meal) => (
        <Paper sx={{ padding: 2, mb: 2 }} key={meal._id} meal={meal}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1">Exercise Name: {meal.name}</Typography>
            <Box>
              <IconButton onClick={() => handleEditMeal(meal._id)}>
                <ModeEditIcon />
              </IconButton>
              <IconButton onClick={() => handleOpenDeleteModal(meal._id)}>
                <DisabledByDefaultIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="body1">
            Total Calories Consumed: {meal.calories}
          </Typography>
        </Paper>
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalMeals ? (
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
          <Typography variant="h6">No Meal Yet</Typography>
        )}
      </Box>
      <Modal
        sx={{ display: "flex", justifyContent: "center" }}
        open={showModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteMeal}
      />
    </div>
  );
}

export default MealLog;
