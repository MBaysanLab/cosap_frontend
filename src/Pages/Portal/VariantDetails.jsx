import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function DetailItem(props) {
  return (
    <>
      <Typography color="#6D6D6D" variant="body2" component="div">
        {props.title}
      </Typography>
      <Typography variant="subtitle1" component="div">
        {props.data ? props.data : "N/A"}
      </Typography>
    </>
  );
}

function VariantDetails(props) {
  return props.variant ? (
    <Grid container spacing={12}>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <DetailItem title="Gene" data={props.variant.gene_symbol} />
          <DetailItem
            title="REF/ALT"
            data={`${props.variant.ref}/${props.variant.alt}`}
          />
          <DetailItem title="HGVSC" data={props.variant.hgvsc} />
          <DetailItem title="Feature" data={props.variant.feature} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
            <DetailItem title="Consequence" data={props.variant.consequence} />
          <DetailItem
            title="rsID"
            data={props.variant.rs_id}
          />
          <DetailItem title="Clinical Significance" data={props.variant.clinical_significance} />
          <DetailItem title="Clinvar" data={props.variant.clinvar} />
        </Box>
      </Grid>
    </Grid>
  ) : (
    <Typography variant="subtitle1" component="div">
      No variant is selected.
    </Typography>
  );
}

export default VariantDetails;
