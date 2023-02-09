/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
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
          boxShadow: "inset 10px -10px 90px 41px rgba(58,112,155,0.1);",
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
          backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);",
        }}
      >
        <ArrowForwardIosRoundedIcon
          color="black"
          sx={{
            fontSize: 30,
          }}
        />
      </Box>
    </ButtonBase>
  );
}

export default ServicesWidgetItem;
