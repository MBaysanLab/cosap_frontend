import React from "react";
import { Box, Typography } from "@mui/material";
import Speedometer from "./Speedometer";

function AlleleFrequency(props) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="body2" component="div">
        {props.title}
      </Typography>
      <Speedometer value={props.value * 100} />
    </Box>
  );
}

export default AlleleFrequency;
