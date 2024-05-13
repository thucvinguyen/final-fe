import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import supportImg from "../images/support_img.png";
import FeedbackForm from "../features/feedback/FeedbackForm";

function Support() {
  // const [rating, setRating] = useState(0);
  // const [message, setMessage] = useState("");

  // const handleRatingChange = (event, newValue) => {
  //   setRating(newValue);
  // };

  // const handleMessageChange = (event) => {
  //   setMessage(event.target.value);
  // };

  // const handleSubmitRating = () => {
  //   console.log("Submitted rating:", rating);
  //   console.log("Submitted message:", message);
  //   setSubmitted(true);
  // };

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
          {/* {submitted ? (
            <Grid item xs={12}>
              <Typography variant="body1" align="center" color="text.secondary">
                Thank you for your rating and feedback!
              </Typography>
            </Grid>
          ) : ( */}
          <>
            <FeedbackForm />
            {/* <Grid>
                <Box display="flex" justifyContent="center" mt={2}>
                  <TextField
                    multiline
                    rows={6}
                    variant="outlined"
                    label="Feedback"
                    value={message}
                    onChange={handleMessageChange}
                    sx={{ width: "100%" }}
                  />
                 
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={handleSubmitRating}
                  >
                    Submit Rating
                  </Button>
                </Box>
              </Grid> */}
          </>
          {/* )} */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Support;
