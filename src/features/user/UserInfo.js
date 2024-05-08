import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import React from "react";

function UserInfo({ selectedUser }) {
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };
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
          Information
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Avatar
              alt={selectedUser.name}
              src={selectedUser.avatarUrl}
              sx={{ width: 120, height: 120, mr: 5 }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography sx={{ marginBottom: 1 }}>
              Email: {selectedUser.email}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              Gender: {selectedUser.gender}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              BMI: {calculateBMI(selectedUser.weight, selectedUser.height)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserInfo;
