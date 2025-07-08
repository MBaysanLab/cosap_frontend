import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { cardColors, cardStyle, dataRowStyle } from "../../styles/cardStyles";

/**
 * Component for displaying disease association information
 * @param {Object} props - Component props
 * @param {Object} props.variant - Variant data object
 * @return {JSX.Element} - Rendered component
 */
function DiseaseCard({ variant }) {
  if (!variant) return null;

  return (
    <Box sx={cardStyle(cardColors.disease, true)}>
      <Box
        sx={{
          bgcolor: cardColors.disease.header,
          p: 1,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <Typography
          color={cardColors.disease.headerText}
          variant="subtitle2"
          fontWeight="bold"
          align="center"
        >
          Disease Associations
        </Typography>
      </Box>

      <Grid container>
        {/* Clinical Significance Section */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ borderRight: { xs: "none", md: "1px solid #e8d9c6" } }}
        >
          <Box
            sx={{
              ...dataRowStyle,
              height: "100%",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body2" color="#555555" fontWeight="medium">
              Clinvar Clinical Significance:
            </Typography>
            <Typography variant="body2" color="#111111" fontWeight="bold">
              {variant.clinical_significance || "0"}
            </Typography>
          </Box>
        </Grid>

        {/* OMIM Section */}
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            borderRight: { xs: "none", md: "1px solid #e8d9c6" },
            borderTop: { xs: "1px solid #e8d9c6", md: "none" },
          }}
        >
          <Box
            sx={{
              ...dataRowStyle,
              height: "100%",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body2" color="#555555" fontWeight="medium">
              OMIM:
            </Typography>
            <Typography variant="body2" color="#111111" fontWeight="bold">
              {variant.omim || "0"}
            </Typography>
          </Box>
        </Grid>

        {/* Orphanet Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ borderTop: { xs: "1px solid #e8d9c6", md: "none" } }}
        >
          <Box
            sx={{
              ...dataRowStyle,
              height: "100%",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="body2"
              color="#555555"
              fontWeight="medium"
              sx={{ alignSelf: "flex-start", pt: 0.5 }}
            >
              Orphanet:
            </Typography>
            {variant.orpha_info ? (
              <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
                {(() => {
                  const parts = variant.orpha_info.split("|");
                  const fields = {
                    disease: parts[0],
                    prevalence: parts[1],
                    inheritance: parts[2],
                    onsetAge: parts[3],
                    omimId: parts[4],
                  };

                  return (
                    <>
                      <Typography
                        variant="body2"
                        color="#111111"
                        fontWeight="bold"
                      >
                        {fields.disease}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: "#e3f2fd",
                            p: 0.5,
                            borderRadius: 1,
                            fontSize: "0.7rem",
                          }}
                        >
                          {fields.prevalence}
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "#e8f5e9",
                            p: 0.5,
                            borderRadius: 1,
                            fontSize: "0.7rem",
                          }}
                        >
                          {fields.inheritance}
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "#fff8e1",
                            p: 0.5,
                            borderRadius: 1,
                            fontSize: "0.7rem",
                          }}
                        >
                          {fields.onsetAge.replace(/<br>/g, ", ")}
                        </Box>
                        {fields.omimId && (
                          <Box
                            sx={{
                              backgroundColor: "#fce4ec",
                              p: 0.5,
                              borderRadius: 1,
                              fontSize: "0.7rem",
                            }}
                          >
                            {fields.omimId}
                          </Box>
                        )}
                      </Box>
                    </>
                  );
                })()}
              </Box>
            ) : (
              <Typography variant="body2" color="#111111" fontWeight="bold">
                0
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DiseaseCard;
