import { Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import homePageImg from "../../images/homepage_img.png";

function About() {
  const { user } = useAuth();
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          mt: 4,
          mb: 4,
          fontFamily: "Copperplate, Fantasy",
        }}
      >
        Welcome to GymSpace, {user ? user.name : "Guest"}!
      </Typography>
      <Typography variant="h7" color="textSecondary">
        Whether you're a seasoned gym-goer or just starting your fitness
        journey, GymSpace provides a comprehensive platform to track your
        workouts, monitor your progress, and discover new exercises tailored to
        your fitness goals.
      </Typography>
      <img src={homePageImg} alt="logo" style={{ width: "90%" }} />
    </>
  );
}

export default About;
