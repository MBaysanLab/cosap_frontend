import React from "react";
import { Box, Typography } from "@mui/material";

function Depth(props) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="body2" component="div">
        Depth
      </Typography>
      <Box
        height={90}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" component="div">
          {
            // If the value is null, display N/A
            props.value ? props.value : "N/A"
          }
        </Typography>
      </Box>
    </Box>
  );
}

export default Depth;
