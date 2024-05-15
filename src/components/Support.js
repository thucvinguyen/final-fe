import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import supportImg from "../images/support_img.png";
import FeedbackForm from "../features/feedback/FeedbackForm";

function Support() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", my: 4 }}>
      <div>
        <Typography variant="h8" color="textSecondary" gutterBottom>
          Share your feedback and rate your experience to help us enhance your
          journey.
        </Typography>
      </div>
      <Grid sx={{ mt: 1 }} container spacing={6} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <img src={supportImg} alt="logo" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <>
            <FeedbackForm />
          </>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Support;
