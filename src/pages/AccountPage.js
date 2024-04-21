import React from "react";
import { Container, Typography } from "@mui/material";
import AccountGeneral from "../features/user/AccountGeneral";

function AccountPage() {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        My Account
      </Typography>
      <AccountGeneral />
    </Container>
  );
}

export default AccountPage;
