import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import useAuth from "../hooks/useAuth";
import FeatureCard from "../components/FeatureCard";
import { useSpring, animated } from "react-spring";
import homePageImg from "../images/homepage_img.png";
import image_1 from "../images/feature1_img.png";
import image_2 from "../images/feature2_img.png";
import image_3 from "../images/feature3_img.png";
import Support from "../components/Support";
import Community from "../components/Community";

function HomePage() {
  const { user } = useAuth();

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <div>
      <Container maxWidth="md" sx={{ textAlign: "center", my: 4 }}>
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
          workouts, monitor your progress, and discover new exercises tailored
          to your fitness goals.
        </Typography>
        <animated.div style={{ ...cardAnimation, marginTop: "-100px" }}>
          <img src={homePageImg} alt="logo" style={{ width: "90%" }} />
        </animated.div>
      </Container>

      <Container maxWidth="md" sx={{ my: 4 }}>
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
          With intuitive features and personalized recommendations, achieving
          your fitness aspirations has never been easier.
        </Typography>
        <Grid sx={{ mt: 1 }} container spacing={6} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <animated.div style={cardAnimation}>
              <FeatureCard
                image={image_1}
                name="Exercise Library"
                description="Offer a variety of exercises for different body parts, complete with instructions to guide users."
              />
            </animated.div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <animated.div style={cardAnimation}>
              <FeatureCard
                image={image_2}
                name="Fitness Tracker"
                description="Monitor daily exercises and dietary habits by keeping track of workouts and nutritional intake."
              />
            </animated.div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <animated.div style={cardAnimation}>
              <FeatureCard
                image={image_3}
                name="Calorie Dashboard"
                description="Provide charts and logs for tracking daily, weekly, and monthly calorie intake and expenditure."
              />
            </animated.div>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ textAlign: "center", my: 4 }}>
        <Typography
          variant="h2"
          sx={{
            mt: 10,
            fontFamily: "Copperplate, Fantasy",
          }}
        >
          Community
        </Typography>
        <Community />
      </Container>

      <Container maxWidth="md" sx={{ textAlign: "center", my: 4 }}>
        <Typography
          variant="h2"
          sx={{
            mt: 10,
            fontFamily: "Copperplate, Fantasy",
          }}
        >
          Support
        </Typography>
        <Support />
      </Container>
    </div>
  );
}

export default HomePage;
