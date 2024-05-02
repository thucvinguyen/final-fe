import React, { useEffect } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import WorkoutList from "../../features/workout/WorkoutList";
import WorkoutSearch from "../../features/workout/WorkoutSearch";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts } from "../../features/workout/workoutSlice";
import { useSpring, animated } from "react-spring";
import { useSearchParams } from "react-router-dom";
import WorkoutSort from "../../features/workout/WorkoutSort";

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
    // console.log("useeffect", nameParam);
    if (!nameParam) {
      dispatch(getWorkouts({ page: currentPage, limit: workoutsPerPage }));
    }
  }, []);

  // const handlePageChange = (event, newPage) => {
  //   console.log("page changed");
  //   setParams({ page: newPage });

  //   if (nameParam) {
  //     setParams({ name: nameParam, page: newPage });
  //   }
  //   if (partParam) {
  //     setParams({ part: partParam, page: newPage });
  //   }
  //   if (equipmentParam) {
  //     setParams({ equipment: equipmentParam, page: newPage });
  //   }
  //   if (levelParam) {
  //     setParams({ level: levelParam, page: newPage });
  //   }
  //   if (!nameParam) {
  //     dispatch(getWorkouts({ page: newPage, limit: workoutsPerPage }));
  //   }
  // };
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
          <WorkoutSort />
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
