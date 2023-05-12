import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Background from "../../assets/images/bg-11.png";
import { Particles } from "../../Components";

function Banner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        pt: { xs: "2vh", md: "7vh" },
        backgroundColor: "#fffff",
      }}
    >
      <Box
        sx={{
          width: "50vw",
          display: { xs: "none", md: "block" },
          zIndex: "-1",
        }}
      >
        <Particles />
      </Box>
      <Box
        sx={{
          padding: { xs: 3 },
          backgroundImage: `url(${Background})`,
        }}
      >
        <Typography variant="h2" sx={{ fontSize: { xs: 48, md: "3.5em" } }}>
          Flexible
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: 48, md: "3.5em" } }}
          color="#de1e3d"
        >
          Next Generation Sequencing
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 48, md: "3.5em" } }}>
          Analysis
        </Typography>
        <Typography
          paragraph
          sx={{
            pt: 5,
            pb: "5vh",
            fontSize: { xs: 15, md: 20 },
          }}
        >
          Fully customizable cloud-based NGS analysis platform <br />
          that allows users to select algorithms and adjust parameters. <br />
          No technical expertise is required!
        </Typography>

        <Button
          component={NavLink}
          to="/portal"
          variant="contained"
          size="large"
          sx={{
            ":hover": {
              background: "linear-gradient(to right, #bbd2c5, #536976);",
            },
          }}
        >
          Go to the COSAP APP
        </Button>
      </Box>
    </Box>
  );
}
export default Banner;
