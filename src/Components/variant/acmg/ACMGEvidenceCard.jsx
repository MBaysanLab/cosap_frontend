import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { cardColors, cardStyle } from "../../../styles/cardStyles";
import ACMGEvidenceTable from "./ACMGEvidenceTable";
import ACMGClassification from "./ACMGClassification";

/**
 * Component for displaying ACMG evidence and classification
 * @param {Object} props - Component props
 * @param {Object} props.variant - Variant data object
 * @param {boolean} props.isEditingIntervar - Whether in editing mode
 * @param {Object} props.editedEvidence - Currently edited evidence
 * @param {string} props.manualClassification - Manual classification override
 * @param {Function} props.onEdit - Callback when edit button is clicked
 * @param {Function} props.onSave - Callback when save button is clicked
 * @param {Function} props.onCancel - Callback when cancel button is clicked
 * @param {Function} props.onToggleCriterion - Callback when criterion is toggled
 * @param {Function} props.onChangeManualClassification - Callback when manual classification changes
 * @return {JSX.Element} - Rendered component
 */
function ACMGEvidenceCard({
  variant,
  isEditingIntervar,
  editedEvidence,
  manualClassification,
  onEdit,
  onSave,
  onCancel,
  onToggleCriterion,
  onChangeManualClassification,
}) {
  if (!variant) return null;

  return (
    <Box sx={cardStyle(cardColors.intervar)}>
      <Box
        sx={{
          bgcolor: cardColors.intervar.header,
          p: 1,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          color={cardColors.intervar.headerText}
          variant="subtitle2"
          fontWeight="bold"
          align="center"
          sx={{ flex: 1 }}
        >
          InterVar ACMG Evidence
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isEditingIntervar ? (
            <>
              <Box
                component="button"
                onClick={onSave}
                sx={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  px: 1.5,
                  py: 0.5,
                  mr: 1,
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#388e3c" },
                }}
              >
                Save
              </Box>
              <Box
                component="button"
                onClick={onCancel}
                sx={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  px: 1.5,
                  py: 0.5,
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#d32f2f" },
                }}
              >
                Cancel
              </Box>
            </>
          ) : (
            <Box
              component="button"
              onClick={onEdit}
              sx={{
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                px: 1.5,
                py: 0.5,
                fontSize: "0.75rem",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#1976d2" },
              }}
            >
              Edit Criteria
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ p: 1.5 }}>
        {variant.evidence_intervar ? (
          <Grid container spacing={2}>
            {/* Left Column - Evidence Codes */}
            <Grid item xs={12} md={7}>
              <ACMGEvidenceTable
                evidence={
                  isEditingIntervar ? editedEvidence : variant.evidence_intervar
                }
                isEditing={isEditingIntervar}
                onToggleCriterion={onToggleCriterion}
              />
            </Grid>

            {/* Right Column - Classification Results */}
            <Grid item xs={12} md={5}>
              <ACMGClassification
                variant={variant}
                isEditing={isEditingIntervar}
                manualClassification={manualClassification}
                editedEvidence={editedEvidence}
                onChangeManualClassification={onChangeManualClassification}
              />
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2" color="#666666" align="center">
            No InterVar evidence available
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ACMGEvidenceCard;
