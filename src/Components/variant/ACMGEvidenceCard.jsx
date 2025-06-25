import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import EvidenceCriteria from "./EvidenceCriteria";
import ClassificationResult from "./ClassificationResult";
import ClassificationRules from "./ClassificationRules";

const ACMGEvidenceCard = ({
  variant,
  cardColors,
  cardStyle,
  isEditing,
  editedEvidence,
  manualClassification,
  onEdit,
  onSave,
  onCancel,
  onToggleCriterion,
  onClassificationChange,
  parseInterVarEvidence,
  classifyACMG,
  evidenceCounts,
  criteriaDescriptions,
  getEvidenceBoxStyle
}) => {
  // Get the correct evidence object based on edit state
  const evidenceObj = isEditing
    ? editedEvidence
    : parseInterVarEvidence(variant.evidence_intervar);

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
          {isEditing ? (
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
            <Grid item xs={12} md={7}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="#444444"
                    fontWeight="medium"
                    sx={{ mb: 1 }}
                  >
                    Pathogenic Evidence:
                  </Typography>

                  {/* Very Strong Evidence */}
                  <Box sx={{ mb: 1 }}>
                    <Typography
                      variant="caption"
                      color="#880000"
                      fontWeight="bold"
                    >
                      Very Strong:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      <EvidenceCriteria
                        title=""
                        color="#880000"
                        criteria={["PVS1"]}
                        isEditing={isEditing}
                        evidenceObj={evidenceObj}
                        onToggle={onToggleCriterion}
                        criteriaDescriptions={criteriaDescriptions}
                        getEvidenceBoxStyle={getEvidenceBoxStyle}
                      />
                    </Box>
                  </Box>

                  {/* Strong Evidence */}
                  <EvidenceCriteria
                    title="Strong"
                    color="#ad1457"
                    criteria={["PS1", "PS2", "PS3", "PS4", "PS5"]}
                    isEditing={isEditing}
                    evidenceObj={evidenceObj}
                    onToggle={onToggleCriterion}
                    criteriaDescriptions={criteriaDescriptions}
                    getEvidenceBoxStyle={getEvidenceBoxStyle}
                  />

                  {/* Moderate Evidence */}
                  <EvidenceCriteria
                    title="Moderate"
                    color="#f57c00"
                    criteria={["PM1", "PM2", "PM3", "PM4", "PM5", "PM6", "PM7"]}
                    isEditing={isEditing}
                    evidenceObj={evidenceObj}
                    onToggle={onToggleCriterion}
                    criteriaDescriptions={criteriaDescriptions}
                    getEvidenceBoxStyle={getEvidenceBoxStyle}
                  />

                  {/* Supporting Evidence */}
                  <EvidenceCriteria
                    title="Supporting"
                    color="#ffa000"
                    criteria={["PP1", "PP2", "PP3", "PP4", "PP5", "PP6"]}
                    isEditing={isEditing}
                    evidenceObj={evidenceObj}
                    onToggle={onToggleCriterion}
                    criteriaDescriptions={criteriaDescriptions}
                    getEvidenceBoxStyle={getEvidenceBoxStyle}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Typography
                    variant="body2"
                    color="#444444"
                    fontWeight="medium"
                    sx={{ mb: 1 }}
                  >
                    Benign Evidence:
                  </Typography>

                  {/* Stand-Alone Evidence */}
                  <EvidenceCriteria
                    title="Stand-Alone"
                    color="#1b5e20"
                    criteria={["BA1"]}
                    isEditing={isEditing}
                    evidenceObj={evidenceObj}
                    onToggle={onToggleCriterion}
                    criteriaDescriptions={criteriaDescriptions}
                    getEvidenceBoxStyle={getEvidenceBoxStyle}
                  />

                  {/* Strong Evidence */}
                  <EvidenceCriteria
                    title="Strong"
                    color="#2e7d32"
                    criteria={["BS1", "BS2", "BS3", "BS4", "BS5"]}
                    isEditing={isEditing}
                    evidenceObj={evidenceObj}
                    onToggle={onToggleCriterion}
                    criteriaDescriptions={criteriaDescriptions}
                    getEvidenceBoxStyle={getEvidenceBoxStyle}
                  />

                  {/* Supporting Evidence */}
                  <EvidenceCriteria
                    title="Supporting"
                    color="#388e3c"
                    criteria={["BP1", "BP2", "BP3", "BP4", "BP5", "BP6", "BP7", "BP8"]}
                    isEditing={isEditing}
                    evidenceObj={evidenceObj}
                    onToggle={onToggleCriterion}
                    criteriaDescriptions={criteriaDescriptions}
                    getEvidenceBoxStyle={getEvidenceBoxStyle}
                  />
                </Grid>
              </Grid>

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

            <Grid
              item
              xs={12}
              md={5}
              sx={{ display: "flex", flexDirection: "column" }}
            >
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
                <ClassificationResult
                  classification={variant.intervar_classification}
                  manualClassification={manualClassification}
                  isEditing={isEditing}
                  onClassificationChange={onClassificationChange}
                  autoClassification={isEditing ? classifyACMG(editedEvidence) : null}
                  classificationMethod={variant.classification_method}
                />
              </Box>

              <ClassificationRules
                evidenceCounts={
                  isEditing
                    ? evidenceCounts(editedEvidence)
                    : evidenceCounts(parseInterVarEvidence(variant.evidence_intervar))
                }
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
};

ACMGEvidenceCard.propTypes = {
  variant: PropTypes.object.isRequired,
  cardColors: PropTypes.object.isRequired,
  cardStyle: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editedEvidence: PropTypes.object,
  manualClassification: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onToggleCriterion: PropTypes.func.isRequired,
  onClassificationChange: PropTypes.func.isRequired,
  parseInterVarEvidence: PropTypes.func.isRequired,
  classifyACMG: PropTypes.func.isRequired,
  evidenceCounts: PropTypes.func.isRequired,
  criteriaDescriptions: PropTypes.object.isRequired,
  getEvidenceBoxStyle: PropTypes.func.isRequired
};

export default React.memo(ACMGEvidenceCard);
