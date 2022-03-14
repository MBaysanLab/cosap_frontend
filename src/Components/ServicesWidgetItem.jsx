import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ButtonBase from "@mui/material/ButtonBase";

function ServicesWidgetItem(props) {
  return (
      <ButtonBase
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "25px",
          mb: props.mb,
          background: props.background,
          "&:hover":{
            background: "#ccc"
          }
        }}
      >
        <Typography variant="h6" color="text.main">
          {props.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.2) none repeat scroll 0% 0%",
            borderRadius: "5px",
            width: "75px",
            height: "75px",
          }}
        >
          <AddIcon sx={{ fontSize: 40 }} />
        </Box>
      </ButtonBase>
  );
}

export default ServicesWidgetItem;
