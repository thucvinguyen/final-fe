import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createFeedback } from "./feedbackSlice";
import { FTextField, FormProvider } from "../../components/form";
import { Box, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CustomRating from "./Rating";

const feedbackSchema = yup.object().shape({
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5")
    .integer("Rating must be a whole number"),
  message: yup.string().required("Message is required"),
});

const defaultValues = {
  rating: 5,
  message: "",
};

function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.feedback);

  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const onSubmit = (data) => {
    dispatch(createFeedback(data)).then(() => reset());
    setSubmitted(true);
  };

  const handleRatingChange = (value) => {
    setValue("rating", value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {submitted ? (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" color="textSecondary">
              Thank you for your rating and feedback! Your input is invaluable
              in refining and elevating your experience.
            </Typography>
          </Grid>
        ) : (
          <Box width="100%">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <CustomRating onRatingChange={handleRatingChange} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FTextField
                  name="message"
                  label="Message"
                  sx={{ width: "100%" }}
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting || isLoading}
                    color="primary"
                    sx={{
                      textTransform: "none",
                      "& .MuiButton-label": { textTransform: "lowercase" },
                    }}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </FormProvider>
    </Box>
  );
}

export default FeedbackForm;
