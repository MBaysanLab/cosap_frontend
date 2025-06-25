import React from "react";
import { Box, Typography } from "@mui/material";
import { classifyACMG, evidenceCounts } from "../../../utils/acmg/utils";
import { getClassificationStyles } from "../../../styles/cardStyles";

/**
 * Component for displaying ACMG classification results
 * @param {Object} props - Component props
 * @param {Object} props.variant - Variant data object
 * @param {boolean} props.isEditing - Whether in editing mode
 * @param {string} props.manualClassification - Manual classification override
 * @param {Object} props.editedEvidence - Currently edited evidence
 * @param {Function} props.onChangeManualClassification - Callback when manual classification changes
 * @returns {JSX.Element} - Rendered component
 */
function ACMGClassification({ 
  variant, 
  isEditing, 
  manualClassification, 
  editedEvidence,
  onChangeManualClassification 
}) {
  if (!variant) return null;
  
  // Calculate the automatic classification if we have edited evidence
  const autoClassification = isEditing 
    ? classifyACMG(editedEvidence) 
    : null;
    
  // Get the appropriate style for the classification display
  const classificationStyles = getClassificationStyles(
    isEditing ? (manualClassification || autoClassification) : variant.intervar_classification
  );
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        p: 2,
        backgroundColor: "rgba(241, 245, 249, 0.5)",
        borderRadius: 2,
        border: "1px solid rgba(209, 213, 219, 0.5)",
      }}
    >
      {/* Classification Result Section */}
      <Typography variant="subtitle1" fontWeight="bold" color="#3b6793" sx={{ mb: 2 }}>
        Classification Result
      </Typography>

      {isEditing ? (
        // Dropdown for manual classification when in edit mode
        <Box sx={{ width: "100%", maxWidth: 300, mb: 2 }}>
          <Typography variant="caption" color="#555555" sx={{ mb: 0.5, display: "block" }}>
            Select classification or let ACMG rules decide:
          </Typography>
          <Box
            component="select"
            value={manualClassification || ""}
            onChange={(e) => onChangeManualClassification(e.target.value || null)}
            sx={{
              width: "100%",
              p: 1.5,
              borderRadius: "8px",
              border: "2px solid rgba(59, 103, 147, 0.5)",
              fontSize: "1rem",
              fontWeight: "bold",
              color: classificationStyles.color,
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              "&:focus": {
                outline: "none",
                borderColor: "#3b6793",
                boxShadow: "0 0 0 3px rgba(59, 103, 147, 0.2)",
              },
            }}
          >
            <option value="">Use ACMG rules (automatic)</option>
            <option value="Pathogenic">Pathogenic</option>
            <option value="Likely pathogenic">Likely pathogenic</option>
            <option value="Uncertain significance">Uncertain significance</option>
            <option value="Likely benign">Likely benign</option>
            <option value="Benign">Benign</option>
          </Box>
          {manualClassification && (
            <Typography variant="caption" color="#d32f2f" sx={{ display: "block", mt: 1 }}>
              * Manual override will be used instead of ACMG rules
            </Typography>
          )}
          <Typography variant="caption" color="#666666" sx={{ display: "block", mt: 0.5 }}>
            ACMG auto-classification: {autoClassification}
          </Typography>
        </Box>
      ) : (
        // Standard display when not in edit mode
        variant.intervar_classification && (
          <Box
            sx={{
              p: 2,
              borderRadius: "8px",
              backgroundColor: classificationStyles.bg,
              border: classificationStyles.border,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: 300,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ color: classificationStyles.color }}>
              {variant.intervar_classification}
            </Typography>
            {variant.classification_method === "manual" && (
              <Typography variant="caption" color="#666666" sx={{ display: "block", mt: 0.5 }}>
                (Manually classified)
              </Typography>
            )}
          </Box>
        )
      )}
      
      {/* ACMG Classification rules explanation */}
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
            <strong>Pathogenic</strong>: 1 PVS + (1 PS or 2 PM or 1 PM+1 PP or 2 PP) <i>or</i> 2 PS <i>or</i> 1 PS + (3 PM or 2 PM+2 PP or 1 PM+4 PP)
          </Box>
          <Box component="li" sx={{ mb: 0.5 }}>
            <strong>Likely pathogenic</strong>: 1 PVS + 1 PM/PP <i>or</i> 1 PS + 1-2 PM/PP <i>or</i> 3+ PM <i>or</i> 2 PM + 2+ PP <i>or</i> 1 PM + 4+ PP
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
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" sx={{ color: "#777777" }}>
            Current evidence count:{" "}
            {Object.entries(
              evidenceCounts(isEditing ? editedEvidence : variant.evidence_intervar)
            ).map(([key, count]) =>
              count > 0 ? `${key.toUpperCase()}=${count} ` : ""
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ACMGClassification;
