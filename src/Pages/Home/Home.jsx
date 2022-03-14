import * as React from "react";
import { NavBar, Footer } from "../../Components/";
import Banner from "./Banner";
import Features from "./Features";
import Box from "@mui/material/Box";
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
    }
  },
  typography: {
    fontFamily: "Poppins",
  },
});
function Home() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Banner />
      <Box sx={{ flex: "1", mb: { xs: "2vh", md: "7vh" } }}>
        <Features />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
export default Home;
