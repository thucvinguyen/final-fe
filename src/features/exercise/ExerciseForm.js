import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux"; // Removed unused import
import { Box, Card, Stack } from "@mui/material"; // Removed unused imports
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { createExercise } from "./exerciseSlice";

const exerciseSchema = yup.object().shape({
  name: yup.string().required("Exercise name is required"),
  sets: yup.number().required("Set is required").positive().integer(),
  reps: yup.number().required("Rep is required").positive().integer(),
});

const defaultValues = {
  name: "",
  sets: "",
  reps: "",
};

function ExerciseForm() {
  const { isLoading } = useSelector((state) => state.exercise);

  const methods = useForm({
    resolver: yupResolver(exerciseSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default ExerciseForm;

// import React from "react";

// function ExerciseForm() {
//   return <div>ExerciseForm</div>;
// }

// export default ExerciseForm;
