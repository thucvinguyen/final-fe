import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { editExercise } from "./exerciseSlice";
import FDate from "../../components/form/FDate";
import dayjs from "dayjs";

const exerciseSchema = yup.object().shape({
  name: yup.string().required("Exercise name is required"),
  sets: yup.number().required("Set is required").positive().integer(),
  reps: yup.number().required("Rep is required").positive().integer(),
  date: yup.string().required("Exercise date is required"),
});

function ExerciseEdit({ exercise, handleCloseModal, setEditMode }) {
  const { isLoading } = useSelector((state) => state.exercise);

  const methods = useForm({
    resolver: yupResolver(exerciseSchema),
    defaultValues: {
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      date: dayjs(exercise.date),
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const onSubmit = (updatedData) => {
    dispatch(editExercise(exercise._id, updatedData));
    setEditMode(false);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h6" textAlign="center">
          Edit Exercise
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
            defaultValue={exercise.name}
            sx={{ width: "60%", mt: 2 }}
          />
          <FTextField
            name="sets"
            label="Set"
            type="number"
            defaultValue={exercise.sets}
            sx={{ width: "60%", mt: 2 }}
          />
          <FTextField
            name="reps"
            label="Rep"
            type="number"
            defaultValue={exercise.reps}
            sx={{ width: "60%", mt: 2 }}
          />
          <FDate
            name="date"
            defaultValue={exercise.date}
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

export default ExerciseEdit;
