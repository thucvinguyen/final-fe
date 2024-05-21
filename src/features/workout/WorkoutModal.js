import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { createExercise } from "../exercise/exerciseSlice";
import FDate from "../../components/form/FDate";
import dayjs from "dayjs";
import ClearIcon from "@mui/icons-material/Clear";

const exerciseSchema = yup.object().shape({
  name: yup.string().required("Exercise name is required"),
  sets: yup.number().required("Set is required").positive().integer(),
  reps: yup.number().required("Rep is required").positive().integer(),
  date: yup.date().required("Date is required"),
});

const WorkoutModal = ({ open, onClose, workoutName }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.exercise);

  const methods = useForm({
    resolver: yupResolver(exerciseSchema),
    defaultValues: {
      name: workoutName,
      sets: "",
      reps: "",
      date: dayjs(),
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    dispatch(createExercise(data)).then(() => {
      reset();
      setTimeout(() => {
        onClose();
      }, 1000);
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Slide}
      TransitionProps={{
        direction: "down",
      }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: "center", position: "relative" }}>
        Add Exercise
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "inherit",
          }}
        >
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box>
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
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutModal;
