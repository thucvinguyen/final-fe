import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Card,
  CardMedia,
  CardContent,
  Button,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { getWorkoutById } from "./workoutSlice";
import LoadingScreen from "../../components/LoadingScreen";

const HoverButton = styled(Button)({
  transition: "all 0.1s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

function WorkoutDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedWorkout, isLoading, error } = useSelector(
    (state) => state.workout
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getWorkoutById(id));
    }
  }, [id, dispatch]);

  const handleSubscription = () => {
    navigate("/subscription");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!selectedWorkout) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          selectedWorkout not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3, position: "relative" }}>
        <Box
          sx={{
            top: 0,
            right: 0,
            margin: 2,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            <Link
              variant="subtitle2"
              component={RouterLink}
              to="/features/exercise-library"
            >
              Back to Exercise Library
            </Link>
          </Typography>
        </Box>
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          variant="h4"
          gutterBottom
        >
          {selectedWorkout.name}
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ mb: 2, display: "flex", justifyContent: "center" }}
        >
          <Grid item>
            <Chip label={selectedWorkout.part} variant="outlined" />
          </Grid>
          <Grid item>
            <Chip label={selectedWorkout.equipment} variant="outlined" />
          </Grid>
          <Grid item>
            <Chip label={selectedWorkout.level} variant="outlined" />
          </Grid>
        </Grid>

        <Typography
          variant="body1"
          sx={{ mb: 2, display: "flex", justifyContent: "center" }}
        >
          {selectedWorkout.description}
        </Typography>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="iframe"
              alt="Workout Video"
              height="194"
              src={selectedWorkout.videoLink}
              title="Workout Video"
              sx={{ cursor: "pointer" }}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" component="p">
                This video instruction is available for Pro users. Upgrade your
                subscription to access.
              </Typography>
              <HoverButton
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  textTransform: "none",
                  "& .MuiButton-label": { textTransform: "lowercase" },
                }}
                onClick={handleSubscription}
              >
                Upgrade
              </HoverButton>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Box>
  );
}

export default WorkoutDetail;
