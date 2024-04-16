import React from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Container maxWidth="md" sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Welcome to
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Your one-stop solution to [user's goal here]
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/get-started"
        >
          Get Started
        </Button>
      </Container>

      {/* Features section */}
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Features
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Feature 1</Typography>
                <Typography>Short description of Feature 1</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Feature 2</Typography>
                <Typography>Short description of Feature 2</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Feature 3</Typography>
                <Typography>Short description of Feature 3</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
