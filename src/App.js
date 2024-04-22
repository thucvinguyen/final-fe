import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./theme";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { BrowserRouter } from "react-router-dom";
// import Router from "./routes";
// import { AuthProvider } from "./contexts/AuthContext";
// import ThemeProvider from "./theme";
// import { Button } from "@mui/material";

// function App() {
//   const [themeMode, setThemeMode] = useState(() => {
//     const savedTheme = localStorage.getItem("themeMode");
//     return savedTheme ? savedTheme : "light";
//   });

//   const toggleTheme = () => {
//     const newThemeMode = themeMode === "light" ? "dark" : "light";
//     setThemeMode(newThemeMode);
//     localStorage.setItem("themeMode", newThemeMode);
//   };

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("themeMode");
//     if (savedTheme) {
//       setThemeMode(savedTheme);
//     }
//   }, []);

//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <ThemeProvider themeMode={themeMode}>
//           <ToggleThemeButton themeMode={themeMode} toggleTheme={toggleTheme} />
//           <Router />
//         </ThemeProvider>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// // Toggle button component
// const ToggleThemeButton = ({ themeMode, toggleTheme }) => {
//   return (
//     <Button onClick={toggleTheme}>
//       {themeMode === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
//     </Button>
//   );
// };

// export default App;
