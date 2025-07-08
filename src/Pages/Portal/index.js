import * as React from "react";
import Box from "@mui/material/Box";
import PortalRoutes from "./routes/PortalRoutes";
import Layout from "../../Layout/Layout";
import { ToastContainer } from "react-toastify";

function Portal() {
  const isSmallScreen = window.innerWidth < 900;

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          flex: 1,
          backgroundImage:
            "linear-gradient(to right, #243949 0%, #517fa4 100%);",
        }}
      >
        <PortalRoutes />
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Layout>
  );
}

export default Portal;
