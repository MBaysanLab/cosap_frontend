import * as React from "react";
import { Box } from "@mui/material";
import LoginCard from "./LoginCard";
import Layout from "../../Layout/Layout";

function AuthLanding() {
  return (
    <Layout>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        sx={{ minHeight: "100vh" }}
      >
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            sx={{
              height: { xs: "calc(100vh - 130px)", md: "calc(90vh - 130px)" },
              mt: { xs: 0, md: "10vh" },
            }}
          >
            <Box
              sx={{
                display: "inline-block",
              }}
            >
              <LoginCard />
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default AuthLanding;
