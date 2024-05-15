import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Grid, Link } from "@mui/material";
import useAuth from "../hooks/useAuth";

function BMIChart() {
  const { user } = useAuth();
  const { weight: initialWeight } = user; // Initial weight from user object
  const [weight, setWeight] = useState(initialWeight); // State to manage weight

  // useEffect to update weight when user changes it
  useEffect(() => {
    setWeight(user.weight);
  }, [user.weight]);

  return (
    <div>
      <Typography variant="h6">Weight: {weight}</Typography>
      {/* Display other BMI chart components here */}
    </div>
  );
}

export default BMIChart;
