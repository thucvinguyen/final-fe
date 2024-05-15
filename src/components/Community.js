import React from "react";
import communityImg from "../images/community_img.png";
import { Box, Button, Container, Typography } from "@mui/material";
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
    <Container maxWidth="md" sx={{ textAlign: "center", my: 4 }}>
      <div>
        <Typography variant="h8" color="textSecondary" gutterBottom>
          Engage with our diverse community of fitness enthusiasts and share
          your journey towards a healthier lifestyle.
        </Typography>
      </div>
      <div>
        <img src={communityImg} alt="logo" style={{ width: "70%" }} />
      </div>
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
    </Container>
  );
}

export default Community;
