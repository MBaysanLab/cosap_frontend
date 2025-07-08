import React from "react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { parseInterVarEvidence } from "../../../utils/acmg/utils";
import { criteriaDescriptions } from "../../../utils/acmg/utils";
import { getEvidenceBoxStyle } from "../../../styles/cardStyles";

/**
 * Component for displaying ACMG evidence criteria table
 * @param {Object} props - Component props
 * @param {Object|string} props.evidence - Evidence data as object or string
 * @param {boolean} props.isEditing - Whether in editing mode
 * @param {Function} props.onToggleCriterion - Callback when criterion is toggled
 * @return {JSX.Element} - Rendered component
 */
function ACMGEvidenceTable({ evidence, isEditing, onToggleCriterion }) {
  // Parse evidence if it's a string
  const evidenceObj =
    typeof evidence === "string" ? parseInterVarEvidence(evidence) : evidence;

  if (!evidenceObj) return null;

  // Helper to create evidence criteria buttons
  const renderCriteriaGroup = (prefix, count, title, titleColor) => {
    return (
      <Box sx={{ mb: 1 }}>
        <Typography variant="caption" color={titleColor} fontWeight="bold">
          {title}:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
          {Array.from({ length: count }).map((_, i) => {
            const criterion = `${prefix}${i + 1}`;
            return (
              <Tooltip
                key={criterion}
                title={criteriaDescriptions[criterion] || criterion}
                arrow
                placement="top"
              >
                <Box
                  onClick={() => isEditing && onToggleCriterion(criterion)}
                  sx={getEvidenceBoxStyle(
                    criterion,
                    evidenceObj[criterion] === 1,
                    isEditing
                  )}
                >
                  {criterion}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
    );
  };

  // Special case for standalone criteria PVS1 and BA1
  const renderStandaloneCriterion = (criterion, title, titleColor) => {
    return (
      <Box sx={{ mb: 1 }}>
        <Typography variant="caption" color={titleColor} fontWeight="bold">
          {title}:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
          <Tooltip
            title={criteriaDescriptions[criterion]}
            arrow
            placement="top"
          >
            <Box
              onClick={() => isEditing && onToggleCriterion(criterion)}
              sx={getEvidenceBoxStyle(
                criterion,
                evidenceObj[criterion] === 1,
                isEditing
              )}
            >
              {criterion}
            </Box>
          </Tooltip>
        </Box>
      </Box>
    );
  };

  return (
    <Grid container spacing={1}>
      {/* Pathogenic Evidence Section */}
      <Grid item xs={12}>
        <Typography
          variant="body2"
          color="#444444"
          fontWeight="medium"
          sx={{ mb: 1 }}
        >
          Pathogenic Evidence:
        </Typography>

        {/* Very Strong Evidence (PVS) */}
        {renderStandaloneCriterion("PVS1", "Very Strong", "#880000")}

        {/* Strong Evidence (PS) */}
        {renderCriteriaGroup("PS", 5, "Strong", "#ad1457")}

        {/* Moderate Evidence (PM) */}
        {renderCriteriaGroup("PM", 7, "Moderate", "#f57c00")}

        {/* Supporting Evidence (PP) */}
        {renderCriteriaGroup("PP", 6, "Supporting", "#ffa000")}
      </Grid>

      {/* Benign Evidence Section */}
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Typography
          variant="body2"
          color="#444444"
          fontWeight="medium"
          sx={{ mb: 1 }}
        >
          Benign Evidence:
        </Typography>

        {/* Stand-Alone Evidence (BA) */}
        {renderStandaloneCriterion("BA1", "Stand-Alone", "#1b5e20")}

        {/* Strong Evidence (BS) */}
        {renderCriteriaGroup("BS", 5, "Strong", "#2e7d32")}

        {/* Supporting Evidence (BP) */}
        {renderCriteriaGroup("BP", 8, "Supporting", "#388e3c")}
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ mt: 1.5, pt: 1, borderTop: "1px solid #eaeaea" }}>
          <Typography
            variant="body2"
            color="#666666"
            align="center"
            fontSize="0.75rem"
          >
            Hover over each criterion for description
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ACMGEvidenceTable;
