/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ButtonBase from "@mui/material/ButtonBase";

function ServicesWidgetItem(props) {
  return (
    <ButtonBase
      component={Link}
      to={props.to}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: "25px",
        mb: "20px",
        boxShadow: 3,
        "&:hover": {
          border: 1,
          borderColor: "#de1e3d",
        },
      }}
    >
      <Typography variant="h6" color="black">
        {props.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          width: "75px",
          height: "75px",
        }}
      >
        <AddIcon
          color="primary"
          sx={{
            fontSize: 40,
            backgroundColor: "#171A1E",
            borderRadius: 3,
          }}
        />
      </Box>
    </ButtonBase>
  );
}

export default ServicesWidgetItem;
