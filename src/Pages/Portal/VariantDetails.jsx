import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ReactComponent as VarsomeLogo } from "../../assets/images/varsome_logo.svg";
import { ReactComponent as FranklinLogo } from "../../assets/images/franklin-dark-bg.svg";

function DetailItem(props) {
  return (
    <>
      <Typography
        color="#6D6D6D"
        variant="body2"
        component="div"
        textAlign={props.text_align}
      >
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
      <VarsomeLogo width={80} />
    </Button>
  );
}

function FranklinButton(props) {
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
      <FranklinLogo width={80} />
    </Button>
  );
}

function VariantDetails(props) {
  const handleVarsomeClick = () => {
    const chromosome = props.variant.location.split("_")[0];
    const pos = props.variant.location.split("_")[1];

    window.open(
      `https://varsome.com/variant/hg38/${chromosome}:${pos}:${props.variant.ref}:${props.variant.alt}`,
      "_blank"
    );
  };

  const handleFranklinClick = () => {
    const chromosome = props.variant.location.split("_")[0];
    const pos = props.variant.location.split("_")[1];

    window.open(
      `https://franklin.genoox.com/clinical-db/variant/snp/${chromosome}-${pos}-${props.variant.ref}-${props.variant.alt}-hg38`,
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
          <DetailItem
            title="Consequence"
            data={props.variant.consequence}
            text_align="right"
          />
          <DetailItem
            title="rsID"
            data={props.variant.rs_id}
            text_align="right"
          />
          <DetailItem
            title="Clinical Significance"
            data={props.variant.clinical_significance}
            text_align="right"
          />
          <DetailItem
            title="Clinvar"
            data={props.variant.clinvar}
            text_align="right"
          />
          {/* Button to redirect Varsome variant page */}
          <VarsomeButton onClick={handleVarsomeClick} />
          {/* Button to redirect Franklin variant page */}
          <FranklinButton onClick={handleFranklinClick} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default VariantDetails;
