import React from "react";
import communityImg from "../../images/community_img.png";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const HoverButton = styled(Button)({
  transition: "all 0.1s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

function Community() {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          mt: 10,
          fontFamily: "Copperplate, Fantasy",
        }}
      >
        Community
      </Typography>
      <Typography variant="h8" color="textSecondary" gutterBottom>
        Engage with our diverse community of fitness enthusiasts and share your
        journey towards a healthier lifestyle.
      </Typography>

      <img src={communityImg} alt="logo" style={{ width: "70%" }} />

      <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
        <HoverButton
          variant="contained"
          color="primary"
          component={Link}
          to={`/community`}
          sx={{
            textTransform: "none",
            "& .MuiButton-label": { textTransform: "lowercase" },
          }}
        >
          Explore Now
        </HoverButton>
      </Box>
    </>
  );
}

export default Community;
