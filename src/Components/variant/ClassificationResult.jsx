import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const ClassificationResult = ({
  classification,
  manualClassification,
  isEditing,
  onClassificationChange,
  autoClassification,
  classificationMethod
}) => {
  // Function to get appropriate color for classification
  const getClassificationColor = (classification) => {
    switch (classification) {
      case "Pathogenic":
        return "#d32f2f";
      case "Likely pathogenic":
        return "#e53935";
      case "Uncertain significance":
        return "#424242";
      case "Likely benign":
        return "#43a047";
      case "Benign":
        return "#2e7d32";
      default:
        return "#424242";
    }
  };

  // Function to get appropriate background color for classification
  const getClassificationBgColor = (classification) => {
    switch (classification) {
      case "Pathogenic":
        return "rgba(211, 47, 47, 0.1)";
      case "Likely pathogenic":
        return "rgba(229, 57, 53, 0.1)";
      case "Uncertain significance":
        return "rgba(117, 117, 117, 0.1)";
      case "Likely benign":
        return "rgba(67, 160, 71, 0.1)";
      case "Benign":
        return "rgba(46, 125, 50, 0.1)";
      default:
        return "rgba(117, 117, 117, 0.1)";
    }
  };

  // Function to get appropriate border color for classification
  const getClassificationBorderColor = (classification) => {
    switch (classification) {
      case "Pathogenic":
        return "2px solid rgba(211, 47, 47, 0.7)";
      case "Likely pathogenic":
        return "2px solid rgba(229, 57, 53, 0.7)";
      case "Uncertain significance":
        return "2px solid rgba(117, 117, 117, 0.7)";
      case "Likely benign":
        return "2px solid rgba(67, 160, 71, 0.7)";
      case "Benign":
        return "2px solid rgba(46, 125, 50, 0.7)";
      default:
        return "2px solid rgba(117, 117, 117, 0.7)";
    }
  };

  return (
    <>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="#3b6793"
        sx={{ mb: 2 }}
      >
        Classification Result
      </Typography>

      {isEditing ? (
        <Box sx={{ width: "100%", maxWidth: 300, mb: 2 }}>
          <Typography
            variant="caption"
            color="#555555"
            sx={{ mb: 0.5, display: "block" }}
          >
            Select classification or let ACMG rules decide:
          </Typography>
          <Box
            component="select"
            value={manualClassification || ""}
            onChange={(e) => onClassificationChange(e.target.value || null)}
            sx={{
              width: "100%",
              p: 1.5,
              borderRadius: "8px",
              border: "2px solid rgba(59, 103, 147, 0.5)",
              fontSize: "1rem",
              fontWeight: "bold",
              color: getClassificationColor(manualClassification),
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
            <option value="Uncertain significance">
              Uncertain significance
            </option>
            <option value="Likely benign">Likely benign</option>
            <option value="Benign">Benign</option>
          </Box>
          {manualClassification && (
            <Typography
              variant="caption"
              color="#d32f2f"
              sx={{ display: "block", mt: 1 }}
            >
              * Manual override will be used instead of ACMG rules
            </Typography>
          )}
          <Typography
            variant="caption"
            color="#666666"
            sx={{ display: "block", mt: 0.5 }}
          >
            ACMG auto-classification: {autoClassification}
          </Typography>
        </Box>
      ) : (
        classification && (
          <Box
            sx={{
              p: 2,
              borderRadius: "8px",
              backgroundColor: getClassificationBgColor(classification),
              border: getClassificationBorderColor(classification),
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: 300,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: getClassificationColor(classification),
              }}
            >
              {classification}
            </Typography>
            {classificationMethod === "manual" && (
              <Typography
                variant="caption"
                color="#666666"
                sx={{ display: "block", mt: 0.5 }}
              >
                (Manually classified)
              </Typography>
            )}
          </Box>
        )
      )}
    </>
  );
};

ClassificationResult.propTypes = {
  classification: PropTypes.string,
  manualClassification: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
  onClassificationChange: PropTypes.func.isRequired,
  autoClassification: PropTypes.string,
  classificationMethod: PropTypes.string
};

export default React.memo(ClassificationResult);
