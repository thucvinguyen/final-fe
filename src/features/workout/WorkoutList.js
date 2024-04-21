import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import { getWorkouts } from "./workoutSlice";

function ExerciseList() {
  const dispatch = useDispatch();
  const { workouts, currentPage, totalPages } = useSelector(
    (state) => state.workout
  );

  const workoutsPerPage = 10;

  useEffect(() => {
    dispatch(getWorkouts({ page: currentPage, limit: workoutsPerPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (event, newPage) => {
    dispatch(getWorkouts({ page: newPage, limit: workoutsPerPage }));
  };

  return (
    <>
      <Table>
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
      </Table>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </>
  );
}

export default ExerciseList;
