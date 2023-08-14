import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Particles } from "../../Components";

function Banner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        pt: { xs: "2vh", md: "7vh" },
      }}
    >
      <Box
        sx={{
          width: "30vw",
          display: { xs: "none", md: "block" },
        }}
      >
        <Particles />
      </Box>
      <Box
        sx={{
          padding: { xs: 3 },
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
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
          sx={{
            fontSize: { xs: 15, md: 20 },
            color: "black",
            ":hover": {
              background: "linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          }}
        >
          Try COSAP Now
        </Button>
      </Box>
    </Box>
  );
}
export default Banner;
