import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DetailTabls from "./DetailTabs";
import { VariantSignificanceIcon } from "./VariantSignificanceIcon";

// const CANCERVAR_CLINICAL_EVIDENCE_POS_MAP = {
//   0: "Therapeutic: FDA approved or investigational with strong evidence",
//   1: "Diagnostic: In Professional guideline or reported evidence with consensus",
//   2: "Prognostic: In Professional guideline or reported evidence with consensus",
//   3: "Mutation type: Activating, LOF (missense, nonsense, indel, splicing), CNVs, fusions",
//   4: "Variant frequencies:Mostly mosaic",
//   5: "Potential germline: Mostly nonmosaic",
//   6: "Population databases: Absent or extremely low MAF",
//   7: "Germline databases: may be present in HGMD/ClinVar",
//   8: "Somatic databases: Most present in COSMIC, My Cancer Genome, TCGA",
//   9: "Predictive from: SIFT, PolyPhen2,MutationTaster, CADD, MetaSVM,MetaLR,FATHMM,GERP++_RS, and mostly as",
//   10: "Pathway: involve in Disease-associated pathways or pathogenic pathways",
//   11: "Publications: Convincing evidence from Functional study, population study, other",
// };

export default function VariantRow(props) {
  const handleClick = () => {
    console.log(props.apiRef.current);
  };

  return (
    <Box onClick={handleClick}>
      <Accordion
        elevation={3}
        sx={{
          width: props.containerWidth - 10,
          borderRadius: "5px",
          marginX: "5px",
          marginTop: "10px",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            marginX: "5px",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          sx={{
            minHeight: "80px",
            padding: "0px",
            "& .MuiAccordionSummary-content": {
              margin: "0px",
              height: "80px",
            },
          }}
        >
          <Grid container spacing={0} sx={{ display: "flex", height: "100%" }}>
            <Grid item sx={{ height: "100%", flexGrow: 1, maxWidth: 80 }}>
              <VariantSignificanceIcon
                classification={props.row.cancervar_classification}
                type="amp"
              />
            </Grid>
            <Grid item sx={{ height: "100%", flexGrow: 1, maxWidth: 120 }}>
              <VariantSignificanceIcon
                classification={props.row.intervar_classification}
                type="acmg"
              />
            </Grid>
            <Grid
              item
              sx={{
                height: "100%",
                flexGrow: 1,
                maxWidth: 170,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  marginX: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                  }}
                >
                  <Typography fontSize={"1.2rem"}>
                    {props.row.gene_symbol || "N/A"}
                  </Typography>
                  <Typography fontSize={"0.7rem"}>
                    {props.row.variant_id || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item sx={{ height: "100%", flexGrow: 1, maxWidth: 80 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize={"0.7rem"} color={"grey"}>
                    VAF
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    {props.row.af || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item sx={{ height: "100%", flexGrow: 1, maxWidth: 100 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    fontSize={"0.7rem"}
                    color={"grey"}
                    textAlign="center"
                  >
                    User Case Freq
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    {props.row.user_case_frequency || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item sx={{ height: "100%", flexGrow: 1, maxWidth: 150 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    fontSize={"0.7rem"}
                    color={"grey"}
                    textAlign="center"
                  >
                    Coding Consequence
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    {props.row.coding_consequence || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails sx={{ overflow: "auto" }}>
          <DetailTabls variant={props.row} bam_files={props.bam_files} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
