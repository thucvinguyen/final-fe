import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

function UserTracker({ selectedUser }) {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 1,
            fontFamily: "Copperplate, Fantasy",
          }}
        >
          Fitness Tracker
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              Exercises
            </Typography>
            {selectedUser.exercise.length === 0 ? (
              <Typography sx={{ textAlign: "center" }}>
                Nothing to show yet
              </Typography>
            ) : (
              selectedUser.exercise.map((exercise, index) => (
                <div key={index} sx={{ marginBottom: 1 }}>
                  <Card sx={{ margin: 2 }}>
                    <Typography sx={{ ml: 2 }}>
                      Name: {exercise.name}
                    </Typography>
                    <Typography sx={{ ml: 2 }}>
                      Expenditure: {exercise.caloriesBurned} calories
                    </Typography>
                  </Card>
                </div>
              ))
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              Meals
            </Typography>
            {selectedUser.meal.length === 0 ? (
              <Typography sx={{ textAlign: "center" }}>
                Nothing to show yet
              </Typography>
            ) : (
              selectedUser.meal.map((meal, index) => (
                <div key={index} sx={{ marginBottom: 1 }}>
                  <Card sx={{ margin: 2 }}>
                    <Typography sx={{ ml: 2 }}>Name: {meal.name}</Typography>
                    <Typography sx={{ ml: 2 }}>
                      Intake: {meal.calories} calories
                    </Typography>
                  </Card>
                </div>
              ))
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserTracker;
