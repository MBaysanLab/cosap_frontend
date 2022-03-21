import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ProjectDetailHeaderItem(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {props.icon}
      <Typography
        variant="h6"
        sx={{
          pr: 1,
          pl: 1,
        }}
        color="secondary"
      >
        {props.title}:
      </Typography>
      <Typography>{props.content}</Typography>
    </Box>
  );
}
export default ProjectDetailHeaderItem;
