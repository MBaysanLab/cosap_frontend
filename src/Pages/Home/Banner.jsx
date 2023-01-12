import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ReactComponent as BannerSVG } from "../../assets/images/banner.svg";

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
      <Box sx={{ width: "50vh", display: { xs: "none", md: "block" } }}>
        <BannerSVG />
      </Box>
      <Box
        sx={{
          padding: { xs: 3 },
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
              backgroundColor: "#de1e3d",
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
