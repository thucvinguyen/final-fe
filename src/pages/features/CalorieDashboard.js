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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function CalorieDashboard() {
  // Given data for total calories burned and total calories intake
  const totalCaloriesBurned = 5500;
  const totalCaloriesIntake = 3500;

  // Define the data for the bar chart
  const data = {
    labels: ["Calories Burned", "Calories Intake"],
    datasets: [
      {
        label: "Calories",
        data: [totalCaloriesBurned, totalCaloriesIntake],
        backgroundColor: ["#4caf50", "#f44336"], // Green for calories burned, red for calories intake
      },
    ],
  };

  // Define the options for the bar chart
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
      legend: {
        display: false, // Hide legend as we only have one dataset
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Calories",
        },
      },
    },
  };

  // Render the bar chart
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default CalorieDashboard;
