import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

import planImg from "../../images/plan_img.png";
import { useNavigate } from "react-router-dom";

function Plan() {
  const navigate = useNavigate();

  const handleSubscription = () => {
    navigate("/subscription");
  };

  const HoverButton = styled(Button)({
    transition: "all 0.1s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  });

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Typography
          variant="h2"
          sx={{
            mt: 10,
            fontFamily: "Copperplate, Fantasy",
          }}
        >
          Choose Your Supscription
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 2,
            mt: 2,
          }}
        >
          <img src={planImg} alt="logo" style={{ width: "50%" }} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 2,
          mt: 2,
        }}
      >
        <HoverButton
          variant="contained"
          sx={{
            textTransform: "none",
            "& .MuiButton-label": { textTransform: "lowercase" },
          }}
          onClick={handleSubscription}
        >
          Start Supscription
        </HoverButton>
      </Box>
    </>
  );
}

export default Plan;
