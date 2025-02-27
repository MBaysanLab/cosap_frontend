import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DetailTabs from "./DetailTabs";
import { VariantSignificanceIcon } from "./VariantSignificanceIcon";

export default function VariantRow(props) {
  const data = props.row;
  const projectType = props.project_type?.toLowerCase();
  data.pedigree = {};

  return (
    <Box>
      <Accordion
        elevation={3}
        sx={{
          width: props.containerWidth - 10,
          borderRadius: "5px",
          marginX: "3px",
          marginTop: "3px",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            marginX: "3px",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          onMouseDown={(event) => event.stopPropagation()}
          sx={{
            minHeight: "50px",
            padding: "0px",
            "& .MuiAccordionSummary-content": {
              margin: "0px",
              height: "50px",
              width: "100%",
            },
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              height: "100%",
              flexWrap: "nowrap",
            }}
          >
            {/* Classification Icon column */}
            {projectType === "somatic" ? (
              <Grid item sx={{ height: "100%", width: "80px", flexShrink: 0 }}>
                <VariantSignificanceIcon
                  classification={data.cancervar_classification}
                  type="amp"
                />
              </Grid>
            ) : (
              <Grid item sx={{ height: "100%", width: "120px", flexShrink: 0 }}>
                <VariantSignificanceIcon
                  classification={data.intervar_classification}
                  type="acmg"
                />
              </Grid>
            )}

            {/* Gene Symbol and HGVS column */}
            <Grid
              item
              sx={{
                height: "100%",
                width: "320px",
                flexShrink: 0,
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
                  <Typography fontSize={"0.8rem"}>
                    {data.gene_symbol || "N/A"}
                  </Typography>
                  <Typography fontSize={"0.7rem"}>
                    {data.hgvsg || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Consequence column */}
            <Grid item sx={{ height: "100%", width: "160px", flexShrink: 0 }}>
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
                    {data.coding_conseqence
                      ? "Coding Consequence"
                      : "Consequence"}
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    {data.coding_consequence || data.consequence || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Pedigree column */}
            <Grid item sx={{ height: "100%", width: "160px", flexShrink: 0 }}>
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
                    Pedigree
                  </Typography>
                  <Tooltip
                    title={
                      <div>
                        <div>Family ID: {data.pedigree.family_id || "N/A"}</div>
                        <div>
                          Affected Members:{" "}
                          {data.pedigree.affected_members?.join(", ") || "N/A"}
                        </div>
                        <div>
                          Inheritance Pattern:{" "}
                          {data.pedigree.inheritance_pattern || "N/A"}
                        </div>
                      </div>
                    }
                    arrow
                  >
                    <Typography fontSize={"0.8rem"}>
                      {data.pedigree.family_id || "N/A"}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>

            {/* Depth column */}
            <Grid item sx={{ height: "100%", width: "80px", flexShrink: 0 }}>
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
                    Depth
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    {data.read_depth || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* VAF column */}
            <Grid item sx={{ height: "100%", width: "80px", flexShrink: 0 }}>
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
                    {data.af || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* gnomAD column */}
            <Grid item sx={{ height: "100%", width: "130px", flexShrink: 0 }}>
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
                    gnomad Genomes AF
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    {data.gnomadg_af || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* TGD column */}
            <Grid item sx={{ height: "100%", width: "130px", flexShrink: 0 }}>
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
                    Turkish Genome Database AF
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    {data.tgd_af || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails sx={{ overflow: "auto" }}>
          <DetailTabs variant={props.row} bam_files={props.bam_files} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
