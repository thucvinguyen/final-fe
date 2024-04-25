import React, { useContext } from "react";
import { Link, Typography, IconButton } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../theme";

function MainFooter() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" p={1}>
        {"Copyright © "}
        <Link color="inherit" href="https://www.linkedin.com/in/thucvinguyen/">
          Vi Nguyen
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "light" ? <DarkModeIcon /> : <WbSunnyIcon />}
      </IconButton>
    </>
  );
}

export default MainFooter;
