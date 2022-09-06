/* eslint-disable max-len */
import * as React from "react";
import Box from "@mui/material/Box";
import ServicesWidgetItem from "./ServicesWidgetItem";

function ServicesWidget(props) {
  return (
    <Box elevation={0} sx={{ display: "flex", flexDirection: "column" }}>
      <ServicesWidgetItem
        name="Somatic Variant Analysis"
        background="#dc8665"
        mb="20px"
        to="/portal/projects/create_project"
      />
      <ServicesWidgetItem
        name="Germline & Trio Analysis"
        background="#138086"
        mb="20px"
        to="/portal/projects/create_project"
      />
      <ServicesWidgetItem
        name="Copy Number Analysis"
        background="#cd7672"
        mb="20px"
        to="/portal/projects/create_project"
      />
      <ServicesWidgetItem
        name="Comparative Analysis"
        background="#eeb462"
        mb="20px"
        to="/portal/projects/create_project"
      />
    </Box>
  );
}

export default ServicesWidget;
