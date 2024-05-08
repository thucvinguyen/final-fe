import React from "react";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createMeal } from "./mealSlice";
import { LoadingButton } from "@mui/lab";
import { FTextField, FormProvider } from "../../components/form";
import dayjs from "dayjs";
import FDate from "../../components/form/FDate";

const mealSchema = yup.object().shape({
  name: yup.string().required("Meal name is required"),
  calories: yup.number().required("Calories is required").positive().integer(),
  date: yup.date().required("Date is required"),
});

const defaultValues = {
  name: "",
  calories: "",
  date: dayjs(),
};

function MealForm() {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.meal);

  const methods = useForm({
    resolver: yupResolver(mealSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    dispatch(createMeal(data)).then(() => reset());
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h6" textAlign="center">
          Log Meal
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
            sx={{ width: "60%", mt: 2 }}
          />
          <FTextField
            name="calories"
            label="Calories"
            type="number"
            sx={{ width: "60%", mt: 2, mb: 2 }}
          />
          <FDate name="date" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
            color="primary"
          >
            Add Meal
          </LoadingButton>
        </Box>
      </Box>
    </FormProvider>
  );
}

export default MealForm;
