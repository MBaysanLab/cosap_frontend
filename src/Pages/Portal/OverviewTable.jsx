import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVariantEditor } from "../../hooks/useVariantEditor";
// Import smaller components
import {
  ACMGEvidenceCard,
  DiseaseCard,
  FrequencyCard,
  InSilicoCard,
  VariantInfoCard,
} from "../../Components/variant";

/**
 * Component for displaying variant overview with all information
 * @param {Object} props - Component props
 * @param {Object} props.variant - Variant data object
 * @param {Function} props.onVariantUpdate - Callback when variant is updated
 * @return {JSX.Element} - Rendered component
 */
function OverviewTable(props) {
  const {
    variant,
    isEditingIntervar,
    editedEvidence,
    manualClassification,
    handleEditIntervar,
    handleSaveIntervar,
    handleCancelIntervar,
    toggleCriterion,
    setManualClassification,
  } = useVariantEditor(props.variant, props.onVariantUpdate);

  return (
    <Grid
      container
      spacing={1}
      sx={{
        background: "linear-gradient(45deg, #F2F2F2, #e7e7e7)",
        borderRadius: 3,
        p: 1,
      }}
    >
      {variant ? (
        <>
          {/* Basic Variant Information Card */}
          <Grid item xs={12} md={6}>
            <VariantInfoCard variant={variant} />
          </Grid>

          {/* GNOMAD Frequencies Card */}
          <Grid item xs={12} md={3}>
            <FrequencyCard variant={variant} />
          </Grid>

          {/* In Silico Predictions Card */}
          <Grid item xs={12} md={3}>
            <InSilicoCard variant={variant} />
          </Grid>

          {/* Disease Associations Card */}
          <Grid item xs={12} sx={{ mt: 1 }}>
            <DiseaseCard variant={variant} />
          </Grid>

          {/* InterVar Evidence Card */}
          <Grid item xs={12} sx={{ mt: 1 }}>
            <ACMGEvidenceCard
              variant={variant}
              isEditingIntervar={isEditingIntervar}
              editedEvidence={editedEvidence}
              manualClassification={manualClassification}
              onEdit={handleEditIntervar}
              onSave={handleSaveIntervar}
              onCancel={handleCancelIntervar}
              onToggleCriterion={toggleCriterion}
              onChangeManualClassification={setManualClassification}
            />
          </Grid>
        </>
      ) : (
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            width: "100%",
            p: 2,
          }}
        >
          <Typography variant="body2">
            Please Select a Variant to View Details
          </Typography>
        </Box>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Grid>
  );
}

export default OverviewTable;
