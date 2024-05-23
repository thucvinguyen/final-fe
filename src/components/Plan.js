import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlanModal from "./PlanModal";
import planImg from "../images/plan_img.png";

function Plan() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const plans = [
    {
      title: "Free",
      price: "$0",
      features: [
        "Exercise Library",
        "Fitness Tracker",
        "Calorie Dashboard",
        "Explore Community",
      ],
    },
    {
      title: "Pro",
      price: "$10",
      features: ["All in Free plan, plus:", "Instruction Videos for Exercise"],
    },
  ];

  const HoverCard = styled(Card)(({ theme }) => ({
    transition: "transform 0.2s ease-in-out",
    transform: "scale(1)",
    "&:hover": {
      transform: "scale(1.1)",
    },
  }));

  const handleSelect = (index) => {
    setSelectedPlan((prevSelected) => (prevSelected === index ? null : index));
    setErrorMessage("");
  };

  const handleOpenModal = () => {
    if (selectedPlan !== null) {
      setIsModalOpen(true);
    } else {
      setErrorMessage("Please select a plan first.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
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
        <Grid container spacing={3} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} sx={{ padding: 2 }} key={index}>
              <HoverCard
                sx={{
                  minHeight: "100%",
                  transform: selectedPlan === index ? "scale(1.1)" : "scale(1)",
                }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={2}
                  >
                    <IconButton
                      onClick={() => handleSelect(index)}
                      color="primary"
                      sx={{ ml: 1 }}
                    >
                      {selectedPlan === index ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </IconButton>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h5" align="center">
                      {plan.title}
                    </Typography>
                  </Box>
                  <Typography variant="h6" align="center" gutterBottom>
                    {plan.price}
                    {plan.price !== "$0" && "/month"}
                  </Typography>
                  <Box>
                    {plan.features.map((feature, idx) => (
                      <Box key={idx} display="flex" alignItems="center" my={1}>
                        <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                        <Typography align="left">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </HoverCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 2,
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            "& .MuiButton-label": { textTransform: "lowercase" },
          }}
          onClick={handleOpenModal}
        >
          Choose Plan
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 2,
        }}
      >
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )}
      </Box>

      <PlanModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default Plan;