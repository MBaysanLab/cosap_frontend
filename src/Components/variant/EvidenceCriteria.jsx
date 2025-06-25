import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CriterionBox from "./CriterionBox";

const EvidenceCriteria = ({
  title,
  color,
  criteria,
  isEditing,
  evidenceObj,
  onToggle,
  criteriaDescriptions,
  getEvidenceBoxStyle
}) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color={color} fontWeight="bold">
        {title}:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          mt: 0.5,
        }}
      >
        {criteria.map((criterion) => (
          <CriterionBox
            key={criterion}
            criterion={criterion}
            isActive={(evidenceObj && evidenceObj[criterion] === 1) || false}
            isEditing={isEditing}
            onToggle={onToggle}
            criteriaDescriptions={criteriaDescriptions}
            getEvidenceBoxStyle={getEvidenceBoxStyle}
          />
        ))}
      </Box>
    </Box>
  );
};

EvidenceCriteria.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  criteria: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditing: PropTypes.bool.isRequired,
  evidenceObj: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
  criteriaDescriptions: PropTypes.object.isRequired,
  getEvidenceBoxStyle: PropTypes.func.isRequired
};

export default React.memo(EvidenceCriteria);
