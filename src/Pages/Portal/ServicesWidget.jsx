/* eslint-disable max-len */
import * as React from "react";
import Box from "@mui/material/Box";
import ServicesWidgetItem from "./ServicesWidgetItem";

function ServicesWidget(props) {
  return (
    <Box elevation={0} sx={{ display: "flex", flexDirection: "column" }}>
      <ServicesWidgetItem
        name="Somatic Variant Analysis"
        to="/portal/projects/create_project?type=SM"
      />
      <ServicesWidgetItem
        name="Germline & Trio Analysis"
        to="/portal/projects/create_project?type=GM"
      />
      <ServicesWidgetItem
        name="Copy Number Analysis"
        to="/portal/projects/create_project?type=CNV"
      />
    </Box>
  );
}

export default ServicesWidget;
