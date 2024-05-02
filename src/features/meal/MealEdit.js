import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { editMeal } from "./mealSlice";

const exerciseSchema = yup.object().shape({
  name: yup.string().required("Exercise name is required"),
  calories: yup.number().required("Calories is required").positive().integer(),
});

function MealEdit({ meal, handleCloseModal, setEditMode }) {
  const { isLoading } = useSelector((state) => state.exercise);

  const methods = useForm({
    resolver: yupResolver(exerciseSchema),
    defaultValues: {
      name: `${meal.name}`,
      calories: `${meal.calories}`,
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const onSubmit = (updatedData) => {
    dispatch(editMeal(meal._id, updatedData));
    setEditMode(false);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h6" textAlign="center">
          Edit Meal
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <FTextField
            name="name"
            label="Meal Name"
            defaultValue={meal.name}
            sx={{ width: "60%", mt: 2 }}
          />
          <FTextField
            name="calories"
            label="Calories"
            type="number"
            defaultValue={meal.calories}
            sx={{ width: "60%", mt: 2 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
            color="primary"
            sx={{ marginRight: 2 }} // Add margin-right to create space between the buttons
          >
            Save
          </LoadingButton>
          <LoadingButton
            type="submit"
            variant="contained"
            onClick={handleCloseModal}
            color="primary"
          >
            Close
          </LoadingButton>
        </Box>
      </Box>
    </FormProvider>
  );
}

export default MealEdit;
