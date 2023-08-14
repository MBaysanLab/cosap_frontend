import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ReactComponent as VarsomeLogo } from "../../assets/images/varsome_logo.svg";

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

function VarsomeButton(props) {
  return (
    <Button
      onClick={props.onClick}
      sx={{
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: "#F2F2F2",
      }}
      variant="outlined"
      color="primary"
    >
      <Typography
        component="div"
        color="black"
        sx={{
          whiteSpace: "nowrap",
          fontSize: 12,
          marginRight: 1,
        }}
      >
        View on
      </Typography>
      <VarsomeLogo width={100} />
    </Button>
  );
}

function VariantDetails(props) {
  const handleVarsomeClick = () => {
    const chromosome = props.variant.location.split(":")[0];
    const pos = props.variant.location.split(":")[1].split("-")[0];

    window.open(
      `https://varsome.com/variant/hg38/${chromosome}:${pos}:${props.variant.ref}:${props.variant.alt}`,
      "_blank"
    );
  };

  return (
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
          <DetailItem title="rsID" data={props.variant.rs_id} />
          <DetailItem
            title="Clinical Significance"
            data={props.variant.clinical_significance}
          />
          <DetailItem title="Clinvar" data={props.variant.clinvar} />
          {/* Button to redirect Varsome variant page */}
          <VarsomeButton onClick={handleVarsomeClick} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default VariantDetails;
