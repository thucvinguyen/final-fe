import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function PlanModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: "center", position: "relative" }}>
        Enter Payment Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "inherit",
          }}
        >
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="cardNumber"
          label="Card Number"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="expiryDate"
          label="Expiry Date"
          type="text"
          fullWidth
        />
        <TextField margin="dense" id="cvv" label="CVV" type="text" fullWidth />
      </DialogContent>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            "& .MuiButton-label": { textTransform: "lowercase" },
          }}
          onClick={onClose}
        >
          Proceed Payment
        </Button>
      </Box>
    </Dialog>
  );
}

export default PlanModal;
