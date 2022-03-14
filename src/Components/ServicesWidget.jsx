import * as React from "react";
import Box from "@mui/material/Box";
import ServicesWidgetItem from "./ServicesWidgetItem";

function ServicesWidget(props) {
  return (
    <Box elevation={0} sx={{ display: "flex", flexDirection: "column"}}>
      <ServicesWidgetItem
        name="Somatic Variant Analysis"
        background="linear-gradient(125deg, rgba(255,255,255,1) 60%, rgb(78, 67, 118) 100%) repeat scroll 0% 0%"
        mb="20px"
      />
      <ServicesWidgetItem name="Germline & Trio Analysis" 
      background="linear-gradient(125deg, rgba(255,255,255,1) 60%, rgba(150,201,61,1) 100%) repeat scroll 0% 0%"
      mb="20px"
      />
      <ServicesWidgetItem name="Copy Number Analysis" 
      background="linear-gradient(125deg, rgba(255,255,255,1) 60%, rgba(0,176,155,1) 100%) repeat scroll 0% 0%"
      mb="20px"/>
    </Box>
  );
}

export default ServicesWidget;