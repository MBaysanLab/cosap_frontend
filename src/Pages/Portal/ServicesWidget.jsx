/* eslint-disable max-len */
import * as React from "react";
import Box from "@mui/material/Box";
import ServicesWidgetItem from "./ServicesWidgetItem";

function ServicesWidget(props) {
  return (
    <Box elevation={0} sx={{ display: "flex", flexDirection: "column" }}>
      <ServicesWidgetItem
        name="Somatic Variant Analysis"
        to="/portal/projects/create_project?type=SOMATIC"
        description="SNVs, SVs, CNVs, MSI, Fusions and their annotations. Implements the GATK Best Practices pipeline."
      />
      <ServicesWidgetItem
        name="Germline Variant Analysis"
        to="/portal/projects/create_project?type=GERMLINE"
        description="SNVs, SVs and their annotations. Implements the GATK Best Practices pipeline."
      />
      <ServicesWidgetItem
        name="Comparative Variant Analysis with Customizable Pipeline"
        to="/portal/projects/create_project?type=COMP"
      />
    </Box>
  );
}

export default ServicesWidget;
