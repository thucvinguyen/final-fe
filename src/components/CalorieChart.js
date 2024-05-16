import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";

function CalorieChart({ user }) {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const { exercise, meal } = user;

  // Aggregate calories by date for exercise
  const exerciseCalorieData = exercise.reduce((acc, item) => {
    const date = dayjs(item.date).format("MM/DD/YYYY");
    acc[date] = (acc[date] || 0) + item.caloriesBurned;
    return acc;
  }, {});

  // Aggregate calories by date for meal
  const mealCalorieData = meal.reduce((acc, item) => {
    const date = dayjs(item.date).format("MM/DD/YYYY");
    acc[date] = (acc[date] || 0) + item.calories;
    return acc;
  }, {});

  // Combine exercise and meal calorie data for mapping
  const combinedCalorieData = {};

  for (let date in exerciseCalorieData) {
    combinedCalorieData[date] = {
      exerciseCalories: exerciseCalorieData[date],
      mealCalories: mealCalorieData[date] || 0, // Handle case where no meals are recorded for a certain date
    };
  }

  const sortedEntries = Object.entries(combinedCalorieData).sort(
    ([dateA], [dateB]) => {
      return (
        dayjs(dateA, "MM/DD/YYYY").valueOf() -
        dayjs(dateB, "MM/DD/YYYY").valueOf()
      );
    }
  );

  const handleTabChange = (event, newValue) => {
    setSelectedMonth(newValue);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "80%",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <FormControl>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <MenuItem key={i} value={dayjs().year() - i}>
                  {dayjs().year() - i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "80%" }}>
          <Tabs
            value={selectedMonth}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Tab key={i} label={dayjs().month(i).format("MMMM")} />
            ))}
          </Tabs>
          <Grid container spacing={2}>
            {sortedEntries
              .filter(
                ([date]) =>
                  dayjs(date, "MM/DD/YYYY").month() === selectedMonth &&
                  dayjs(date, "MM/DD/YYYY").year() === selectedYear
              )
              .map(([date, { exerciseCalories, mealCalories }]) => (
                <Grid item xs={12} md={4} lg={3} key={date}>
                  <Paper sx={{ mt: 4 }} elevation={3}>
                    <Box p={2}>
                      <h3>Date: {date}</h3>
                      <p>Calories Expenditure: {exerciseCalories}</p>
                      <p>Calories Intake: {mealCalories}</p>
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default CalorieChart;
