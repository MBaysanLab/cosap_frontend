import * as React from "react";
import { NavBar, Footer } from "../../Components/";
import Banner from "./Banner";
import Features from "./Features";
import Box from "@mui/material/Box";

function Home() {
  return (
    <>
      <NavBar />
      <Banner />
      <Box sx={{ flex: "1" }}>
        <Features />
      </Box>
      <Footer />
    </>
  );
}
export default Home;
