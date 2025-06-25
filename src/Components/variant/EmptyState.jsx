import React from "react";
import { Box, Typography } from "@mui/material";

const EmptyState = () => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        width: "100%",
        p: 2,
      }}
    >
      <Typography variant="body2">
        Please Select a Variant to View Details
      </Typography>
    </Box>
  );
};

export default EmptyState;
