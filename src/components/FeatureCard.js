import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function FeatureCard({ name, description }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          textAlign="center"
          sx={{ fontFamily: "Copperplate, Fantasy" }}
        >
          {name}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography color="textSecondary">{description}</Typography>
      </CardContent>
      {/* The button is placed in a Box at the bottom of the card */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/features/${name.toLowerCase().replace(/\s+/g, "-")}`}
        >
          Get Started
        </Button>
      </Box>
    </Card>
  );
}

export default FeatureCard;
