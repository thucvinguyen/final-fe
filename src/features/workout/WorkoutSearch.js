import React, { useState } from "react";
import { TextField, IconButton, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getWorkouts } from "./workoutSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

function WorkoutSearch() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [params, setParams] = useSearchParams();
  const partParam = params.get("part");
  const equipmentParam = params.get("equipment");
  const levelParam = params.get("level");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedParams = { ...params };

    if (partParam) updatedParams.part = partParam;
    if (equipmentParam) updatedParams.equipment = equipmentParam;
    if (levelParam) updatedParams.level = levelParam;

    if (searchQuery.trim() !== "") {
      updatedParams.name = searchQuery;
    }

    setParams(updatedParams);

    dispatch(getWorkouts({ page: 1, limit: 9, ...updatedParams }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <TextField
          value={searchQuery}
          placeholder="Search by name"
          onChange={(event) => setSearchQuery(event.target.value)}
          sx={{ width: 300 }}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  color="primary"
                  aria-label="search by name"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </form>
  );
}

export default WorkoutSearch;
