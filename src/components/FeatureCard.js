import { Typography, Box, Button, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const HoverButton = styled(Button)({
  transition: "all 0.1s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

function FeatureCard({ name, description, image }) {
  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "20px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            textAlign="center"
            sx={{ fontFamily: "Copperplate, Fantasy" }}
          >
            {name}
          </Typography>
          <Typography color="textSecondary">{description}</Typography>
          <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
            <HoverButton
              variant="contained"
              color="primary"
              component={Link}
              to={`/features/${name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              Get Start
            </HoverButton>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FeatureCard;
