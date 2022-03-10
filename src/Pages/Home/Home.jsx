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
      <Box sx={{ flex: "1", mb: { xs: "2vh", md: "7vh" } }}>
        <Features />
      </Box>
      <Footer />
    </>
  );
}
export default Home;
