import React, { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import customizeComponents from "./customizations";

const PRIMARY = {
  lighter: "#555555",
  light: "#333333",
  main: "#000000",
  dark: "#000000",
  darker: "#000000",
  contrastText: "#FFF",
};

const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#FFF",
};

const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

function ThemeProvider({ children }) {
  // State to track the current theme: 'light' or 'dark'
  const [themeMode, setThemeMode] = useState(() => {
    const savedThemeMode = localStorage.getItem("themeMode");
    return savedThemeMode ? savedThemeMode : "light";
  });

  // Save the user's theme preference in local storage
  const toggleTheme = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
    localStorage.setItem("themeMode", newThemeMode);
  };

  // Define light and dark theme options
  const themeOptions = {
    palette: {
      mode: themeMode,
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      text: {
        primary: themeMode === "dark" ? GREY[100] : GREY[800],
        secondary: themeMode === "dark" ? GREY[300] : GREY[600],
        disabled: themeMode === "dark" ? GREY[400] : GREY[500],
      },
      background: {
        paper: themeMode === "dark" ? GREY[900] : "#fff",
        default: themeMode === "dark" ? GREY[900] : "#fff",
        neutral: themeMode === "dark" ? GREY[800] : GREY[200],
      },
      action: {
        active: themeMode === "dark" ? GREY[400] : GREY[600],
        hover: themeMode === "dark" ? GREY[600] : GREY[500_8],
        selected: themeMode === "dark" ? GREY[700] : GREY[500_16],
        disabled: themeMode === "dark" ? GREY[700] : GREY[500_80],
        disabledBackground: themeMode === "dark" ? GREY[700] : GREY[500_24],
        focus: themeMode === "dark" ? GREY[600] : GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
    },
    shape: { borderRadius: 8 },
  };

  const theme = createTheme(themeOptions);
  theme.components = customizeComponents(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {/* Pass the toggleTheme function as a prop to children */}
      {React.cloneElement(children, { toggleTheme })}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
