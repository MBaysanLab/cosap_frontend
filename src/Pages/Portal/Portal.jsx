import * as React from "react";
import NavBar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Box from "@mui/material/Box";
import PortalMain from "./PortalMain";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      dark: "#7896a6",
    },
    secondary: {
      main: "#DE1E3D",
    },
    action: {
      active: "#001E3C",
    },
    button: {
      main: "#428A9C"
    },
    success: {
      main: "#5be5a5"
    },
    progress: {
      main : "#85cde5"
    }
  },
  typography: {
    fontFamily: "Poppins",
  },
});

function Portal() {
  const isSmallScreen = window.innerWidth < 900;

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          flex: 1,
        }}
      >
        <PortalMain orientation={isSmallScreen ? "horizontal" : "vertical"} />
      </Box>
      <Footer ml={isSmallScreen ? "0" : "240px"} />
    </ThemeProvider>
  );
}

export default Portal;
