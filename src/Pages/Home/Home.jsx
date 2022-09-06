import * as React from "react";
import Box from "@mui/material/Box";
import Banner from "./Banner";
import Features from "./Features";
import Layout from "../../Layout/Layout";

function Home() {
  return (
    <Layout>
      <Banner />
      <Box sx={{ flex: "1", mb: { xs: "2vh", md: "7vh" } }}>
        <Features />
      </Box>
    </Layout>
  );
}
export default Home;
