import React from "react";
import { Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const CriterionBox = ({
  criterion,
  isActive,
  isEditing,
  onToggle,
  criteriaDescriptions,
  getEvidenceBoxStyle,
  colorConfig
}) => {
  const criterionType = criterion.replace(/[0-9]/g, '');
  
  // Define styles based on criterion type
  let styles = {
    ...getEvidenceBoxStyle(criterion, isActive),
    transform: isActive ? "scale(1.05)" : "none",
    transition: "transform 0.2s",
    cursor: isEditing ? "pointer" : "default",
  };
  
  // Add hover effect if editable
  if (isEditing) {
    styles = {
      ...styles,
      "&:hover": {
        opacity: 0.85,
        transform: "scale(1.15)",
      }
    };
  }
  
  // Special styling for PVS1 and BA1
  if (criterion === "PVS1" || criterion === "BA1") {
    const isPVS = criterion === "PVS1";
    styles = {
      ...styles,
      backgroundColor: isActive 
        ? isPVS ? "#d32f2f" : "#2e7d32"
        : isPVS ? "#ffcdd2" : "#c8e6c9",
      color: isActive ? "#ffffff" : "#626262",
      transform: isActive ? "scale(1.1)" : "none",
      boxShadow: isActive 
        ? isPVS 
          ? "0 4px 8px rgba(211, 47, 47, 0.4)"
          : "0 4px 8px rgba(46, 125, 50, 0.4)"
        : "none",
    };
  } else {
    // Add appropriate box shadow based on criterion type
    if (isActive) {
      const shadowColors = {
        "PS": "rgba(229, 57, 53, 0.3)",
        "PM": "rgba(255, 143, 0, 0.3)",
        "PP": "rgba(255, 179, 0, 0.3)",
        "BS": "rgba(56, 142, 60, 0.3)",
        "BP": "rgba(67, 160, 71, 0.3)"
      };
      
      styles.boxShadow = `0 3px 6px ${shadowColors[criterionType] || "rgba(0, 0, 0, 0.2)"}`;
    }
  }
  
  return (
    <Tooltip
      title={criteriaDescriptions[criterion] || criterion}
      arrow
      placement="top"
    >
      <Box
        onClick={() => isEditing && onToggle(criterion)}
        sx={styles}
      >
        {criterion}
      </Box>
    </Tooltip>
  );
};

CriterionBox.propTypes = {
  criterion: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  criteriaDescriptions: PropTypes.object.isRequired,
  getEvidenceBoxStyle: PropTypes.func.isRequired,
  colorConfig: PropTypes.object
};

CriterionBox.defaultProps = {
  colorConfig: null
};

export default React.memo(CriterionBox);
