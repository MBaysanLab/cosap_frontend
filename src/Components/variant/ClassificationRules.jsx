import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const ClassificationRules = ({ evidenceCounts }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 300,
        mt: 2,
        backgroundColor: "#f5f5f5",
        p: 1.5,
        borderRadius: 1,
      }}
    >
      <Typography variant="caption" fontWeight="medium" color="#333333">
        ACMG Classification Algorithm:
      </Typography>
      <Box
        component="ul"
        sx={{
          pl: 2.5,
          mt: 0.5,
          fontSize: "0.75rem",
          color: "#444444",
        }}
      >
        <Box component="li" sx={{ mb: 0.5 }}>
          <strong>Pathogenic</strong>: 1 PVS + (1 PS or 2 PM or 1 PM+1 PP or 2 PP){" "}
          <i>or</i> 2 PS <i>or</i> 1 PS + (3 PM or 2 PM+2 PP or 1 PM+4 PP)
        </Box>
        <Box component="li" sx={{ mb: 0.5 }}>
          <strong>Likely pathogenic</strong>: 1 PVS + 1 PM/PP <i>or</i> 1 PS + 1-2
          PM/PP <i>or</i> 3+ PM <i>or</i> 2 PM + 2+ PP <i>or</i> 1 PM + 4+ PP
        </Box>
        <Box component="li" sx={{ mb: 0.5 }}>
          <strong>Benign</strong>: 1 BA1 <i>or</i> 2+ BS
        </Box>
        <Box component="li" sx={{ mb: 0.5 }}>
          <strong>Likely benign</strong>: 1 BS + 1 BP <i>or</i> 2+ BP
        </Box>
        <Box component="li">
          <strong>Uncertain significance</strong>: All other criteria combinations
        </Box>
      </Box>
      {evidenceCounts && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" sx={{ color: "#777777" }}>
            Current evidence count:{" "}
            {Object.entries(evidenceCounts).map(([key, count]) =>
              count > 0 ? `${key.toUpperCase()}=${count} ` : ""
            )}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

ClassificationRules.propTypes = {
  evidenceCounts: PropTypes.object,
};

export default React.memo(ClassificationRules);
