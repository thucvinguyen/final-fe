import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../gymspace.png";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box
      sx={{
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <img
        src={logoImg}
        alt="logo"
        style={{ maxWidth: "100%", maxHeight: "100%", margin: 0, padding: 0 }}
      />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
