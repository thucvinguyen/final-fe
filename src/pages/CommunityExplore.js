import React from "react";
import UserList from "../features/user/UserList";
import { Container, Grid, Typography } from "@mui/material";
import community2Img from "../images/community2_img.png";

function CommunityExplore() {
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            Explore Our Community
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
            Connect with fellow members, share experiences, and support each
            other on your wellness journey.
          </Typography>
          <UserList />
        </Grid>

        <Grid item xs={12} md={6}>
          <img src={community2Img} alt="Community" style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CommunityExplore;
