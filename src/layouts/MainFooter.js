import React, { useState, useEffect } from "react";
import { Link, Typography, Button } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function MainFooter() {
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("themeMode");
    return savedTheme ? savedTheme : "light";
  });

  const toggleTheme = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
    localStorage.setItem("themeMode", newThemeMode);
    if (window.toggleTheme) {
      window.toggleTheme();
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

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
      <Button onClick={toggleTheme}>
        {themeMode === "light" ? <DarkModeIcon /> : <WbSunnyIcon />}
      </Button>
    </>
  );
}

export default MainFooter;
