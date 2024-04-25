// import React, { useState } from "react";
// import { TextField, IconButton, Box, InputAdornment } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { useDispatch } from "react-redux";
// import { getWorkouts } from "./workoutSlice";
// // import { searchWorkoutsByName } from "./workoutSlice";

// function WorkoutSearch() {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   console.log("workout search render:");
//   const handleSubmit = (e) => {
//     console.log(e);
//     e.preventDefault();
//     // dispatch(searchWorkoutsByName(searchQuery));
//     dispatch(
//       getWorkouts({
//         page: 1,
//         limit: 10,
//         name: searchQuery, // Use searchQuery as the value for the name parameter
//       })
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Box display="flex" alignItems="center" justifyContent="center">
//         <TextField
//           value={searchQuery}
//           placeholder="Search by name"
//           onChange={(event) => setSearchQuery(event.target.value)}
//           sx={{ width: 300 }}
//           size="small"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   type="submit"
//                   color="primary"
//                   aria-label="search by name"
//                 >
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>
//     </form>
//   );
// }

// export default WorkoutSearch;

import React, { useState, useEffect } from "react";
import { TextField, IconButton, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getWorkouts } from "./workoutSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

function WorkoutSearch() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const nameParam = params.get("name");

    if (nameParam) {
      setSearchQuery(nameParam);
      dispatch(getWorkouts({ page: 1, limit: 9, name: nameParam }));
    }
  }, [params, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      setParams({ name: searchQuery }); // Update URL with name parameter and reset page to 1
      dispatch(getWorkouts({ page: 1, limit: 9, name: searchQuery }));
    }
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
