import React, { useEffect } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import WorkoutSearch from "../../features/workout/WorkoutSearch";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts } from "../../features/workout/workoutSlice";
import { useSpring, animated } from "react-spring";
import { useSearchParams } from "react-router-dom";
import WorkoutFilter from "../../features/workout/WorkoutFilter";
import WorkoutCard from "../../features/workout/WorkoutCard";

function ExerciseLibrary() {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { workouts, currentPage, totalPages } = useSelector(
    (state) => state.workout
  );

  const workoutsPerPage = 9;

  const nameParam = params.get("name");
  const partParam = params.get("part");
  const equipmentParam = params.get("equipment");
  const levelParam = params.get("level");

  useEffect(() => {
    if (!nameParam) {
      dispatch(getWorkouts({ page: currentPage, limit: workoutsPerPage }));
    }
  }, []);

  const handlePageChange = (event, newPage) => {
    const updatedParams = {};

    if (nameParam) updatedParams.name = nameParam;
    if (partParam) updatedParams.part = partParam;
    if (equipmentParam) updatedParams.equipment = equipmentParam;
    if (levelParam) updatedParams.level = levelParam;

    updatedParams.page = newPage;

    setParams(updatedParams);
    dispatch(
      getWorkouts({ page: newPage, limit: workoutsPerPage, ...updatedParams })
    );
  };

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

        <Box
          sx={{
            marginTop: 2,
            padding: 2,
          }}
        >
          <WorkoutFilter />
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
                <WorkoutCard
                  key={index}
                  workout={workout}
                  workoutName={workout.name} // Pass the workout name dynamically
                />
              ))}
          </Grid>
        </animated.div>
      </Box>
    </>
  );
}

export default ExerciseLibrary;
