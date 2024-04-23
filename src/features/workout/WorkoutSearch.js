import React, { useState } from "react";
import { TextField, IconButton, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { searchWorkoutsByName } from "./workoutSlice";

function WorkoutSearch() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  console.log("workout search render:");
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    dispatch(searchWorkoutsByName(searchQuery));
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
