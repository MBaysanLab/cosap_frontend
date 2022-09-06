import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ReactComponent as BannerSVG } from "../assets/images/banner.svg";

function Banner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        mt: { xs: "2vh", md: "7vh" },
      }}
    >
      <Box sx={{ width: "50vh", minWidth: "500px" }}>
        <BannerSVG />
      </Box>
      <Box>
        <Typography variant="h2" sx={{ fontWeight: 1000 }}>
          Flexible
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 1000 }} color="secondary">
          Next Generation Sequencing
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 1000 }}>
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
          to="/signup"
          variant="contained"
          size="large"
          color="primary"
        >
          Create Account for Free Trial
        </Button>
      </Box>
    </Box>
  );
}
export default Banner;
