import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import useAuth from "../hooks/useAuth";
import FeatureCard from "../components/FeatureCard";

function HomePage() {
  const { user } = useAuth();
  return (
    <div>
      <Container maxWidth="md" sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Welcome, {user ? user.name : "Guest"}
        </Typography>
      </Container>

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Our Features
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              name="Exercise Library"
              description="Offers a variety of exercises for different body parts, complete with instructions and images to guide users."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              name="Fitness Tracker"
              description="Allows users to track their daily workout exercises and diet."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              name="Calorie Dashboard"
              description="Provides charts and logs for tracking daily, weekly, and monthly calorie intake and expenditure."
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
