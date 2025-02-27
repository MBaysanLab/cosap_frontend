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
      <Typography
        variant="subtitle1"
        component="div"
        sx={{
          width: "150px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          textAlign: props.text_align,
        }}
      >
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
        backgroundColor: "#012A56",
        "&:hover": {
          backgroundColor: "#012A56",
        },
      }}
      variant="outlined"
    >
      <Typography
        component="div"
        color="white"
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
        backgroundColor: "#18244A",
        "&:hover": {
          backgroundColor: "#18244A",
        },
      }}
      variant="outlined"
      color="primary"
    >
      <Typography
        component="div"
        color="white"
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
  const variant = props.variantAnnotation.variant;
  const chrom = variant.chrom;
  const pos = variant.pos;
  const ref = variant.ref;
  const alt = variant.alt;

  const handleVarsomeClick = () => {
    window.open(
      `https://varsome.com/variant/hg38/${chrom}:${pos}:${ref}:${alt}`,
      "_blank"
    );
  };

  const handleFranklinClick = () => {
    window.open(
      `https://franklin.genoox.com/clinical-db/variant/snp/${chrom}-${pos}-${ref}-${alt}-hg38`,
      "_blank"
    );
  };

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <DetailItem title="Gene" data={props.variantAnnotation.gene_symbol} />
          <DetailItem title="REF/ALT" data={`${ref}/${alt}`} />
          <DetailItem title="HGVSC" data={props.variantAnnotation.hgvsg} />
          <DetailItem title="Feature" data={props.variantAnnotation.feature} />
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
            data={props.variantAnnotation.consequence}
            text_align="right"
          />
          <DetailItem
            title="rsID"
            data={props.variantAnnotation.rs_id}
            text_align="right"
          />
          <DetailItem
            title="Clinical Significance"
            data={props.variantAnnotation.clinical_significance}
            text_align="right"
          />
          <DetailItem
            title="Clinvar"
            data={props.variantAnnotation.clinvar}
            text_align="right"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <VarsomeButton onClick={handleVarsomeClick} />
            <Box sx={{ width: 10 }} />
            <FranklinButton onClick={handleFranklinClick} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default VariantDetails;
