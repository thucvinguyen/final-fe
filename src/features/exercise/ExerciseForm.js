import React from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { createExercise } from "./exerciseSlice";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FDate from "../../components/form/FDate";

const exerciseSchema = yup.object().shape({
  name: yup.string().required("Exercise name is required"),
  sets: yup.number().required("Set is required").positive().integer(),
  reps: yup.number().required("Rep is required").positive().integer(),
  // date: yup.date().required("Date is required").nullable(),
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

  // const { control } = useFormContext();

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
            sx={{ width: "60%", mt: 2, mb: 2 }}
          />
          <FDate name="date" />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Date" name="date" />
            </DemoContainer>
          </LocalizationProvider> */}
          {/* <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker {...field} label="Date" />
                </DemoContainer>
              </LocalizationProvider>
            )}
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
