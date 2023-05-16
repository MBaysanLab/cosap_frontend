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
        variant="subtitle"
        sx={{
          pr: 1,
          pl: 1,
        }}
        color="#6D6D6D"
      >
        {props.title}:
      </Typography>
      <Typography component={"span"}>{props.content}</Typography>
    </Box>
  );
}
export default ProjectDetailHeaderItem;
