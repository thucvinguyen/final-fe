import React, { createContext, useMemo, useState } from "react";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import customizeComponents from "./customizations";

const PRIMARY = {
  lighter: "#ffcf88",
  light: "#ffc670",
  main: "#ffbd59",
  dark: "#daa24c",
  darker: "#b6873f",
  contrastText: "rgba(0, 0, 0, 0.87)",
};

const SECONDARY = {
  lighter: "#88b7ff",
  light: "#70a9ff",
  main: "#599bff",
  dark: "#4c84da",
  darker: "#3f6eb6",
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
  const [mode, setMode] = useState("light");
  const themeOptions = (mode) =>
    mode === "light"
      ? {
          typography: {
            fontFamily: ["Abercu", "sans-serif"].join(","),
          },
          palette: {
            primary: PRIMARY,
            secondary: SECONDARY,
            success: SUCCESS,
            background: {
              paper: "#fff",
              default: "#fff",
              neutral: GREY[200],
            },
            text: {
              primary: GREY[800],
              secondary: GREY[600],
              disabled: GREY[500],
              header: "black",
            },
            action: {
              active: GREY[600],
              hover: GREY[500_8],
              selected: GREY[500_16],
              disabled: GREY[500_80],
              disabledBackground: GREY[500_24],
              focus: GREY[500_24],
              hoverOpacity: 0.08,
              disabledOpacity: 0.48,
            },
          },
        }
      : {
          typography: {
            fontFamily: ["Abercu", "sans-serif"].join(","),
          },
          palette: {
            mode: "dark",
            primary: PRIMARY,
            secondary: SECONDARY,
            success: SUCCESS,
            text: {
              primary: GREY[0],
              secondary: GREY[200],
              disabled: GREY[400],
              header: "white",
            },
            background: {
              default: "rgba(43, 42, 51)",
            },
          },
        };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  let theme = useMemo(() => createTheme(themeOptions(mode)), [mode]);
  theme.components = customizeComponents(theme);
  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export default ThemeProvider;
