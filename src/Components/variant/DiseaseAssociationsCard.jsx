import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

const DiseaseAssociationsCard = ({ variant, cardColors, dataRowStyle, cardStyle }) => {
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
                {/* We'll assume orpha_info is properly handled in the parent component */}
                <Typography variant="body2" color="#111111" fontWeight="bold">
                  {variant.orpha_info}
                </Typography>
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
};

DiseaseAssociationsCard.propTypes = {
  variant: PropTypes.object.isRequired,
  cardColors: PropTypes.object.isRequired,
  dataRowStyle: PropTypes.object.isRequired,
  cardStyle: PropTypes.func.isRequired,
};

export default React.memo(DiseaseAssociationsCard);
