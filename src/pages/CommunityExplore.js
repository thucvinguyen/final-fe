import React from "react";
import UserList from "../features/user/UserList";
import { Container, Grid } from "@mui/material";
import UserProfilePage from "./UserProfilePage";
import CalorieChart from "../components/CalorieChart";

function CommunityExplore() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <UserList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CommunityExplore;
