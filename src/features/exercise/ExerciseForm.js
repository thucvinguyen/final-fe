import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { createExercise, getExercises } from "./exerciseSlice";

const exerciseSchema = yup.object().shape({
  name: yup.string().required("Exercise name is required"),
  sets: yup.number().required("Set is required").positive().integer(),
  reps: yup.number().required("Rep is required").positive().integer(),
  // date: yup
  //   .string()
  //   .required("Date is required")
  //   .matches(
  //     /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/,
  //     "Date must be in the format DD/MM/YY"
  //   ),
});

const defaultValues = {
  name: "",
  sets: "",
  reps: "",
  // date: "",
};

function ExerciseForm() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.exercise);

  const methods = useForm({
    resolver: yupResolver(exerciseSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log("data", data);
    dispatch(createExercise(data)).then(() => reset());
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h6" textAlign="center">
          Log Exercise
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
            label="Exercise Name"
            sx={{ width: "60%", mt: 2 }}
          />
          <FTextField
            name="sets"
            label="Set"
            type="number"
            sx={{ width: "60%", mt: 2 }}
          />
          <FTextField
            name="reps"
            label="Rep"
            type="number"
            sx={{ width: "60%", mt: 2 }}
          />
          {/* <FTextField
            name="date"
            label="Date (DD/MM/YY)"
            sx={{ width: "60%", mt: 2 }}
          /> */}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
            color="primary"
          >
            Add Exercise
          </LoadingButton>
        </Box>
      </Box>
    </FormProvider>
  );
}

export default ExerciseForm;
