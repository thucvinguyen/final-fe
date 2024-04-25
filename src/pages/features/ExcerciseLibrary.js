import React, { useEffect } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import WorkoutList from "../../features/workout/WorkoutList";
import WorkoutSearch from "../../features/workout/WorkoutSearch";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts } from "../../features/workout/workoutSlice";
import { useSpring, animated } from "react-spring";

function ExerciseLibrary() {
  const dispatch = useDispatch();
  const { workouts, currentPage, totalPages } = useSelector(
    (state) => state.workout
  );

  const workoutsPerPage = 9;

  useEffect(() => {
    dispatch(getWorkouts({ page: currentPage, limit: workoutsPerPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (event, newPage) => {
    dispatch(getWorkouts({ page: newPage, limit: workoutsPerPage }));
  };

  // Animation props for the entire WorkoutList section
  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "60%" }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
              Exercise Library
            </Typography>
            <WorkoutSearch />
          </Box>
        </Box>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
          }}
          variant="outlined"
          shape="rounded"
        />

        <animated.div style={animationProps}>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
            {workouts &&
              workouts.map((workout, index) => (
                <WorkoutList key={index} workout={workout} />
              ))}
          </Grid>
        </animated.div>
      </Box>
    </>
  );
}

export default ExerciseLibrary;
