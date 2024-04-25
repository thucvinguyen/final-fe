import React, { useState } from "react";
import {
  Typography,
  Box,
  Rating,
  Button,
  TextField,
  Container,
  Grid,
} from "@mui/material";
import supportImg from "../images/support_img.png";

function Support() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitRating = () => {
    console.log("Submitted rating:", rating);
    console.log("Submitted feedback:", feedback);
    setSubmitted(true);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", my: 4 }}>
      <img src={supportImg} alt="logo" style={{ width: "90%" }} />
      <Grid container spacing={2} justifyContent="center">
        {submitted ? (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" color="text.secondary">
              Thank you for your rating and feedback!
            </Typography>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Rating
                  name="rating"
                  value={rating}
                  onChange={handleRatingChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mt={2}>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  label="Feedback"
                  value={feedback}
                  onChange={handleFeedbackChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitRating}
                >
                  Submit Rating
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default Support;
