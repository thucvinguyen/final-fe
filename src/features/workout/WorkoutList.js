import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { getWorkouts } from "./workoutSlice";

function WorkoutList() {
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

  return (
    <>
      {/* <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Instruction</TableCell>
            <TableCell>Equipment</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workouts.map((workout, index) => (
            <TableRow key={index}>
              <TableCell>{workout.name}</TableCell>
              <TableCell>{workout.part}</TableCell>
              <TableCell>{workout.description}</TableCell>
              <TableCell>{workout.equipment}</TableCell>
              <TableCell>{workout.level}</TableCell>
              <TableCell>{workout.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {workouts &&
          workouts.map((workout, index) => (
            <Paper key={index} style={{ width: "30%", padding: "10px" }}>
              <Typography
                variant="h5"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {workout.name}
              </Typography>
              <Divider />
              <Typography>Group: {workout.part}</Typography>
              <Typography>Equipment: {workout.equipment}</Typography>
              <Typography>Level: {workout.level}</Typography>
              <Typography>Type: {workout.type}</Typography>
              <Typography>Instruction: {workout.description}</Typography>
            </Paper>
          ))}
      </div>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        variant="outlined"
        shape="rounded"
      />
    </>
  );
}

export default WorkoutList;
