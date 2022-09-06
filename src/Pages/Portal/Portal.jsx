import * as React from "react";
import Box from "@mui/material/Box";
import PortalMain from "./PortalMain";
import Layout from "../../Layout/Layout";

function Portal() {
  const isSmallScreen = window.innerWidth < 900;

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          flex: 1,
        }}
      >
        <PortalMain />
      </Box>
    </Layout>
  );
}

export default Portal;
