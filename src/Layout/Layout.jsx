import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Footer, NavBar } from "../Components";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ffffff",
      dark: "#7896a6",
    },
    secondary: {
      main: "#0076E2",
    },
    action: {
      active: "#001E3C",
    },
    button: {
      main: "#428A9C",
    },
    success: {
      main: "#5be5a5",
    },
    progress: {
      main: "#68d4e8",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightRegular: 200,
    fontWeightMedium: 500,
  },
});

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <>{children}</>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
