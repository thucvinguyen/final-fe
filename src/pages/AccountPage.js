import React from "react";
import { Box, Typography } from "@mui/material";
import AccountGeneral from "../features/user/AccountGeneral";

function AccountPage() {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Account Settings
      </Typography>

      <AccountGeneral />
    </Box>
  );
}

export default AccountPage;
