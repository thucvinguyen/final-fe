import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function CalorieChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Calories Burned",
        data: [
          // 2500, 6000, 5800, 6200, 5900, 5700, 6000, 5800, 5900, 6000, 5700,
          // 5900,
          3500, 3200, 3400, 3100, 3300, 3000, 3400, 3300, 3200, 3300, 3100,
          3200,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Red for calories burned
      },
      {
        label: "Calories Intake",
        data: [
          // 3500, 3200, 3400, 3100, 3300, 3000, 3400, 3300, 3200, 3300, 3100,
          // 3200,
          2500, 6000, 5800, 6200, 5900, 5700, 6000, 5800, 5900, 6000, 5700,
          5900,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue for calories intake
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y} calories`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Calories",
        },
      },
    },
  };

  // const totalBurned = data.datasets[0].data.reduce(
  //   (acc, curr) => acc + curr,
  //   0
  // );
  // const totalIntake = data.datasets[1].data.reduce(
  //   (acc, curr) => acc + curr,
  //   0
  // );

  // let message = "";
  // if (totalIntake < totalBurned) {
  //   message = "Congratulations! Keep up the good work!";
  // } else {
  //   message = "Great effort! Keep challenging and pushing harder!";
  // }

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Bar data={data} options={options} />
      {/* <Typography
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
        variant="h6"
        color="textSecondary"
      >
        {message}
      </Typography> */}
    </div>
  );
}

export default CalorieChart;
