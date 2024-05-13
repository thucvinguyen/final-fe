import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts } from "./workoutSlice";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

function WorkoutSort() {
  const [params, setParams] = useSearchParams();
  const partParam = params.get("part");
  const equipmentParam = params.get("equipment");
  const levelParam = params.get("level");
  const nameParams = params.get("name");

  const dispatch = useDispatch();
  const [sortOptions, setSortOptions] = useState({
    part: "",
    equipment: "",
    level: "",
    name: nameParams || "",
  });

  const { workouts } = useSelector((state) => state.workout);

  useEffect(() => {
    if (partParam) {
      setSortOptions((prevOptions) => ({
        ...prevOptions,
        part: partParam,
      }));
    }

    if (equipmentParam) {
      setSortOptions((prevOptions) => ({
        ...prevOptions,
        equipment: equipmentParam,
      }));
    }

    if (levelParam) {
      setSortOptions((prevOptions) => ({
        ...prevOptions,
        level: levelParam,
      }));
    }

    if (nameParams) {
      setSortOptions((prevOptions) => ({
        ...prevOptions,
        name: nameParams,
      }));
    }
  }, []);

  // save value in the filter field
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    console.log("name", name);
    setSortOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sortParams = {};
    if (nameParams) {
      sortParams.name = nameParams;
    }
    if (sortOptions.part) {
      sortParams.part = sortOptions.part;
    }
    if (sortOptions.equipment) {
      sortParams.equipment = sortOptions.equipment;
    }
    if (sortOptions.level) {
      sortParams.level = sortOptions.level;
    }
    console.log("sortParams", sortParams);

    if (Object.keys(sortParams).length > 0) {
      console.log("sort param");
      setParams(sortParams);
      dispatch(getWorkouts({ page: 1, limit: 9, ...sortParams }));
    }
  };

  const handleClear = () => {
    // Resetting filter parameters
    setSortOptions({
      part: "",
      equipment: "",
      level: "",
    });

    // Clearing URL parameters
    const clearParams = {};
    setParams(clearParams);

    dispatch(getWorkouts({ page: 1, limit: 9, ...clearParams }));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="part-label">Body Part</InputLabel>
            <Select
              labelId="part-label"
              id="part"
              name="part"
              value={sortOptions.part}
              onChange={handleChange}
            >
              <MenuItem value="">Select Body Part</MenuItem>
              <MenuItem value="Abdominals">Abdominals</MenuItem>
              <MenuItem value="Quadriceps">Quadriceps</MenuItem>
              <MenuItem value="Shoulders">Shoulders</MenuItem>
              <MenuItem value="Chest">Chest</MenuItem>
              <MenuItem value="Biceps">Biceps</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="equipment-label">Equipment</InputLabel>
            <Select
              labelId="equipment-label"
              id="equipment"
              name="equipment"
              value={sortOptions.equipment}
              onChange={handleChange}
            >
              <MenuItem value="">Select Equipment</MenuItem>
              <MenuItem value="Bands">Bands</MenuItem>
              <MenuItem value="Barbell">Barbell</MenuItem>
              <MenuItem value="Body Only">Body Only</MenuItem>
              <MenuItem value="Cable">Cable</MenuItem>
              <MenuItem value="Dumbbell">Dumbbell</MenuItem>
              <MenuItem value="Kettlebells">Kettlebells</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="level-label">Level</InputLabel>
            <Select
              labelId="level-label"
              id="level"
              name="level"
              value={sortOptions.level}
              onChange={handleChange}
            >
              <MenuItem value="">Select Level</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Expert">Expert</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ "& .MuiSvgIcon-root": { marginRight: "0.5rem" } }}
        >
          <TuneIcon /> Apply Filter
        </Button>
        <Button variant="contained" onClick={handleClear}>
          Clear Filter
        </Button>
      </Grid>

      {workouts.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
          No workouts found based on the selected filters.
        </Typography>
      )}
    </>
  );
}

export default WorkoutSort;
