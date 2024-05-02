import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Modal, Backdrop, Fade } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { createExercise } from "./exerciseSlice";

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

function WorkoutModal() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.exercise);

  const [open, setOpen] = useState(false);

  const methods = useForm({
    resolver: yupResolver(exerciseSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    dispatch(createExercise(data)).then(() => handleClose());
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              backgroundColor: "white",
              width: 400,
              padding: 4,
              borderRadius: 4,
            }}
          >
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
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default WorkoutModal;
