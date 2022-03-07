import * as React from "react";
import NavBar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Box from "@mui/material/Box";
import PortalMain from "./PortalMain";

function Portal() {
  const isSmallScreen = window.innerWidth < 900;

  return (
    <>
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
      <Footer ml="240px" />
    </>
  );
}

export default Portal;
