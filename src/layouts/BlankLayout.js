import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Logo sx={{ width: 200, height: 200, mb: 4, mt: 4 }} />

      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default BlankLayout;
