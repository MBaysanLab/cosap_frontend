import React from "react";
import { Box, Divider, Link, Typography } from "@mui/material";
import PropTypes from "prop-types";

const VariantInfoCard = ({ variant, cardColors, dataRowStyle, cardStyle }) => {
  return (
    <Box sx={cardStyle(cardColors.variantInfo)}>
      <Box
        sx={{
          bgcolor: cardColors.variantInfo.header,
          p: 1,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <Typography
          color={cardColors.variantInfo.headerText}
          variant="subtitle2"
          fontWeight="bold"
          align="center"
        >
          Variant Information
        </Typography>
      </Box>

      <Box sx={{ mt: 0.5 }}>
        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            Chr:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.variant.chrom || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            Pos:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.variant.pos || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            Ref:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.variant.ref || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            Alt:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.variant.alt || "0"}
          </Typography>
        </Box>

        <Divider sx={{ my: 0.5 }} />

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            HGVSG:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.hgvsg || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            HGVSC:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.hgvsc || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            HGVSP:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.hgvsp || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            Gene:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.gene_symbol || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            Consequence:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.consequence || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            Function:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.function || "N/A"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            Impact:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.impact || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            Transcript:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.feature || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            rsID:
          </Typography>
          {variant.rs_id ? (
            <Link
              href={`https://www.ncbi.nlm.nih.gov/snp/${variant.rs_id}`}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                mr: 1,
                color: "#1565c0",
                fontSize: "0.8rem",
              }}
            >
              {variant.rs_id}
            </Link>
          ) : (
            <Typography variant="body2" color="#111111" fontWeight="bold">
              0
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

VariantInfoCard.propTypes = {
  variant: PropTypes.object.isRequired,
  cardColors: PropTypes.object.isRequired,
  dataRowStyle: PropTypes.object.isRequired,
  cardStyle: PropTypes.func.isRequired,
};

export default React.memo(VariantInfoCard);
