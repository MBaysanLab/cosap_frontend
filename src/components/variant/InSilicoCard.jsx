import React from "react";
import { Box, Typography } from "@mui/material";
import { cardColors, cardStyle, dataRowStyle } from "../../styles/cardStyles";

/**
 * Component for displaying in silico prediction information
 * @param {Object} props - Component props
 * @param {Object} props.variant - Variant data object
 * @returns {JSX.Element} - Rendered component
 */
function InSilicoCard({ variant }) {
  if (!variant) return null;
  
  return (
    <Box sx={cardStyle(cardColors.inSilico)}>
      <Box
        sx={{
          bgcolor: cardColors.inSilico.header,
          p: 1,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <Typography
          color={cardColors.inSilico.headerText}
          variant="subtitle2"
          fontWeight="bold"
          align="center"
        >
          In Silico Predictions
        </Typography>
      </Box>

      <Box sx={{ mt: 0.5 }}>
        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            SIFT:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.sift || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            PolyPhen:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.polyphen || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            AlphaMissense:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.alphamissense || "0"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default InSilicoCard;
