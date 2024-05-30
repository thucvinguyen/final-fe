import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
} from "@mui/material";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";

function CalorieChart({ user }) {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [chartData, setChartData] = useState(null);

  const { exercise, meal } = user;

  useEffect(() => {
    const generateChartData = () => {
      try {
        const daysInMonth = dayjs()
          .year(selectedYear)
          .month(selectedMonth)
          .daysInMonth();
        if (!Number.isInteger(daysInMonth) || daysInMonth <= 0) {
          throw new RangeError("Invalid number of days in month");
        }
        const labels = Array.from({ length: daysInMonth }, (_, i) =>
          (i + 1).toString()
        );
        const exerciseCalories = new Array(daysInMonth).fill(0);
        const mealCalories = new Array(daysInMonth).fill(0);

        exercise.forEach((item) => {
          const date = dayjs(item.date);
          if (date.year() === selectedYear && date.month() === selectedMonth) {
            const day = date.date() - 1;
            exerciseCalories[day] += item.caloriesBurned;
          }
        });

        meal.forEach((item) => {
          const date = dayjs(item.date);
          if (date.year() === selectedYear && date.month() === selectedMonth) {
            const day = date.date() - 1;
            mealCalories[day] += item.calories;
          }
        });

        return {
          labels,
          datasets: [
            {
              label: "Calories Expenditure",
              data: exerciseCalories,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
            {
              label: "Calories Intake",
              data: mealCalories,
              fill: false,
              borderColor: "rgb(255, 99, 132)",
              tension: 0.1,
            },
          ],
        };
      } catch (error) {
        console.error("Error generating chart data:", error);
        return null;
      }
    };

    setChartData(generateChartData());
  }, [selectedMonth, selectedYear, exercise, meal]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedMonth(newValue);
  };

  return (
    <Box sx={{ mb: 3 }}>
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
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Box p={2}>
                  {chartData ? (
                    <Line data={chartData} />
                  ) : (
                    <p>Error generating chart data</p>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default CalorieChart;
