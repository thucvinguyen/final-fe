import { Grid, Typography } from "@mui/material";
import React from "react";
import FeatureCard from "../../components/FeatureCard";
import image_1 from "../../images/feature1_img.png";
import image_2 from "../../images/feature2_img.png";
import image_3 from "../../images/feature3_img.png";

function Features() {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mt: 8,
          mb: 4,
          fontFamily: "Copperplate, Fantasy",
        }}
      >
        Our Features
      </Typography>
      <Typography variant="h7" color="textSecondary">
        With intuitive features and personalized recommendations, achieving your
        fitness aspirations has never been easier.
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={6} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            image={image_1}
            name="Exercise Library"
            description="Offer a variety of exercises for different body parts, complete with instructions to guide users."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            image={image_2}
            name="Fitness Tracker"
            description="Monitor daily exercises and dietary habits by keeping track of workouts and nutritional intake."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            image={image_3}
            name="Calorie Dashboard"
            description="Provide charts and logs for tracking daily, weekly, and monthly calorie intake and expenditure."
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Features;
