import React, { useEffect, useState } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { deleteMeal, getMeals } from "./mealSlice";
import Modal from "../../components/form/Modal";
import { LoadingButton } from "@mui/lab";

function MealLog() {
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [mealIdToDelete, setMealIdToDelete] = useState(null); // State to store the ID of the meal to delete

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

  const handleModalOpen = (mealId) => {
    setShowModal(true);
    setMealIdToDelete(mealId); // Set the mealIdToDelete state to the ID of the meal to delete
  };

  const handleModalClose = () => {
    setShowModal(false);
    setMealIdToDelete(null); // Reset the mealIdToDelete state
  };

  const handleDeleteMeal = () => {
    dispatch(deleteMeal(mealIdToDelete)); // Delete the meal with the ID stored in mealIdToDelete
    handleModalClose();
  };

  return (
    <div>
      {meals.map((meal) => (
        <Paper sx={{ padding: 2, mb: 2 }} key={meal._id} meal={meal}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Meal Name: {meal.name}</Typography>
            <IconButton onClick={() => handleModalOpen(meal._id)}>
              <DisabledByDefaultIcon />
            </IconButton>
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
          <Typography variant="h6">No Exercise Yet</Typography>
        )}
      </Box>
      <Modal
        sx={{ display: "flex", justifyContent: "center" }}
        open={showModal}
        onClose={handleModalClose}
        onConfirm={handleDeleteMeal}
      />
    </div>
  );
}

export default MealLog;
