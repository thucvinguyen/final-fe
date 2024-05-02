import React from "react";
import CalorieChart from "../../components/form/CalorieChart";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

function CalorieDashboard() {
  const { user } = useAuth();
  const { weight, height, gender } = user;
  const location = useLocation();
  const path = location.pathname;

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };
  const bmi = calculateBMI();

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) {
      return "You're currently underweight. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "You have a healthy weight. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      return "You're currently overweight. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
    } else {
      return "You're currently obese. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
    }
  };
  const bmiStatus = getBMIStatus(bmi);

  let title;
  if (path === "/me") {
    title = "Profile";
  } else if (path === "/features/calorie-dashboard") {
    title = "Calorie Dashboard";
  }

  return (
    <div>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "80%" }}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
            {title}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ borderRadius: 40 }}>
                <CardContent>
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    variant="h6"
                    gutterBottom
                  >
                    Height:
                  </Typography>
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    variant="body1"
                  >
                    {height} cm
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ borderRadius: 40 }}>
                <CardContent>
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    variant="h6"
                    gutterBottom
                  >
                    Weight:
                  </Typography>
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    variant="body1"
                  >
                    {weight} kg
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ borderRadius: 40 }}>
                <CardContent>
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    variant="h6"
                    gutterBottom
                  >
                    Gender:
                  </Typography>
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    variant="body1"
                  >
                    {gender}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ borderRadius: 40 }}>
                <CardContent>
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    variant="h6"
                    gutterBottom
                  >
                    BMI:
                  </Typography>
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    variant="body1"
                  >
                    {bmi}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid
            sx={{
              mt: 3,
            }}
          >
            <Typography sx={{ display: "flex", justifyContent: "center" }}>
              {bmiStatus}
            </Typography>
          </Grid>
          <Box sx={{ mt: 4, mb: 4 }}>
            <CalorieChart />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default CalorieDashboard;
