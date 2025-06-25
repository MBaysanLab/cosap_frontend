import React from "react";
import { Box, Divider, Grid, Link, Tooltip, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OverviewTable(props) {
  const [variant, setVariant] = React.useState(null);
  const [isEditingIntervar, setIsEditingIntervar] = React.useState(false);
  const [editedEvidence, setEditedEvidence] = React.useState(null);
  // Add state to track manual classification override
  const [manualClassification, setManualClassification] = React.useState(null);

  React.useEffect(() => {
    setVariant(props.variant);
    // Reset edited evidence when variant changes
    setEditedEvidence(null);
    setIsEditingIntervar(false);
  }, [props.variant]);

  const handleEditIntervar = () => {
    // Initialize edited evidence based on current evidence
    const currentEvidence = parseInterVarEvidence(variant.evidence_intervar);
    setEditedEvidence(currentEvidence ? { ...currentEvidence } : {});
    // Set manual classification to current classification as starting point
    setManualClassification(variant.intervar_classification);
    setIsEditingIntervar(true);
  };

  // Function to show notifications using react-toastify
  const showNotification = (message, type = "info") => {
    const toastOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      case "warning":
        toast.warning(message, toastOptions);
        break;
      case "info":
      default:
        toast.info(message, toastOptions);
    }
  };

  const handleSaveIntervar = () => {
    // Build new evidence string from editedEvidence
    const newEvidenceString = buildInterVarEvidenceString(editedEvidence);

    const previousClassification = variant.intervar_classification;
    // Use manual classification if provided, otherwise use ACMG rules
    const newClassification =
      manualClassification || classifyACMG(editedEvidence);

    // Update variant with new evidence and classification
    const updatedVariant = {
      ...variant,
      evidence_intervar: newEvidenceString,
      intervar_classification: newClassification,
      // Optional: add a flag to indicate manual classification was used
      classification_method: manualClassification ? "manual" : "automated",
    };

    setVariant(updatedVariant);
    setIsEditingIntervar(false);
    setManualClassification(null); // Reset manual classification

    // If classification changed, show a notification
    if (previousClassification !== newClassification) {
      showNotification(
        `Classification updated: ${previousClassification} → ${newClassification}`,
        "success"
      );
    } else {
      showNotification("Evidence criteria updated", "info");
    }

    // If you have a callback to notify parent components of changes
    if (props.onVariantUpdate) {
      props.onVariantUpdate(updatedVariant);
    }

    console.log(
      `Variant classification updated from ${variant.intervar_classification} to ${newClassification}`
    );
  };

  const handleCancelIntervar = () => {
    setIsEditingIntervar(false);
    setEditedEvidence(null);
    setManualClassification(null);
  };

  const toggleCriterion = (criterion) => {
    if (!isEditingIntervar) return;

    setEditedEvidence((prev) => {
      const newEvidence = { ...prev };
      // Toggle: if present, remove it; if not present, add it with value 1
      if (newEvidence[criterion] === 1) {
        delete newEvidence[criterion];
      } else {
        newEvidence[criterion] = 1;
      }
      return newEvidence;
    });
  };

  // Function to build the evidence string from object representation
  const buildInterVarEvidenceString = (evidenceObj) => {
    if (!evidenceObj) return "";

    // Initialize arrays for each category
    const ps = Array(5).fill(0);
    const pm = Array(7).fill(0);
    const pp = Array(6).fill(0);
    const bs = Array(5).fill(0);
    const bp = Array(8).fill(0);

    // Fill arrays based on evidence object
    Object.keys(evidenceObj).forEach((key) => {
      if (key === "PVS1" || key === "BA1") {
        // These are handled separately
      } else if (key.startsWith("PS")) {
        const index = parseInt(key.substring(2)) - 1;
        if (index >= 0 && index < ps.length) ps[index] = 1;
      } else if (key.startsWith("PM")) {
        const index = parseInt(key.substring(2)) - 1;
        if (index >= 0 && index < pm.length) pm[index] = 1;
      } else if (key.startsWith("PP")) {
        const index = parseInt(key.substring(2)) - 1;
        if (index >= 0 && index < pp.length) pp[index] = 1;
      } else if (key.startsWith("BS")) {
        const index = parseInt(key.substring(2)) - 1;
        if (index >= 0 && index < bs.length) bs[index] = 1;
      } else if (key.startsWith("BP")) {
        const index = parseInt(key.substring(2)) - 1;
        if (index >= 0 && index < bp.length) bp[index] = 1;
      }
    });

    // Construct the evidence string
    const parts = [];
    if ("PVS1" in evidenceObj) parts.push(`PVS1=${evidenceObj.PVS1}`);
    if ("BA1" in evidenceObj) parts.push(`BA1=${evidenceObj.BA1}`);

    parts.push(`PS=[${ps.join(",")}]`);
    parts.push(`PM=[${pm.join(",")}]`);
    parts.push(`PP=[${pp.join(",")}]`);
    parts.push(`BS=[${bs.join(",")}]`);
    parts.push(`BP=[${bp.join(",")}]`);

    return parts.join(" ");
  };

  // Color palette for different card types
  const cardColors = {
    variantInfo: {
      header: "rgba(74, 109, 167, 1)",
      headerText: "#ffffff",
      border: "#c6d4ea",
    },
    gnomad: {
      header: "rgba(91, 140, 90, 1)",
      headerText: "#ffffff",
      border: "#d0e8cf",
    },
    inSilico: {
      header: "rgba(156, 107, 140, 1)",
      headerText: "#ffffff",
      border: "#e8d0df",
    },
    disease: {
      header: "rgba(161, 124, 78, 1)",
      headerText: "#ffffff",
      border: "#e8d9c6",
    },
    intervar: {
      header: "rgba(59, 103, 147, 1)",
      headerText: "#ffffff",
      border: "#c2d5e8",
    },
  };

  // Common style for all card containers
  const cardStyle = (colorSet, preventScroll = false) => ({
    display: "flex",
    flexDirection: "column",
    p: 0,
    height: "100%",
    border: `1px solid ${colorSet.border}`,
    borderRadius: 2,
    background: "#FFFFFF",
    overflow: preventScroll ? "visible" : "auto", // Prevent scrolling if specified
  });

  // Style for data row pairs (label + value)
  const dataRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 2,
    py: 0.5,
    "&:nth-of-type(even)": {
      backgroundColor: "#f9f9f9",
    },
  };

  // Function to parse InterVar evidence string
  const parseInterVarEvidence = (evidenceString) => {
    if (!evidenceString) return null;

    const evidenceMap = {};

    // Extract PVS1 and BA1 (single values)
    const pvs1Match = evidenceString.match(/PVS1=(\d)/);
    if (pvs1Match) evidenceMap.PVS1 = parseInt(pvs1Match[1]);

    const ba1Match = evidenceString.match(/BA1=(\d)/);
    if (ba1Match) evidenceMap.BA1 = parseInt(ba1Match[1]);

    // Extract arrays: PS, PM, PP, BS, BP
    const psMatch = evidenceString.match(/PS=\[([^\]]+)\]/);
    if (psMatch) {
      const psValues = psMatch[1].split(",").map((v) => parseInt(v.trim()));
      for (let i = 0; i < psValues.length; i++) {
        if (psValues[i] === 1) evidenceMap[`PS${i + 1}`] = 1;
      }
    }

    const pmMatch = evidenceString.match(/PM=\[([^\]]+)\]/);
    if (pmMatch) {
      const pmValues = pmMatch[1].split(",").map((v) => parseInt(v.trim()));
      for (let i = 0; i < pmValues.length; i++) {
        if (pmValues[i] === 1) evidenceMap[`PM${i + 1}`] = 1;
      }
    }

    const ppMatch = evidenceString.match(/PP=\[([^\]]+)\]/);
    if (ppMatch) {
      const ppValues = ppMatch[1].split(",").map((v) => parseInt(v.trim()));
      for (let i = 0; i < ppValues.length; i++) {
        if (ppValues[i] === 1) evidenceMap[`PP${i + 1}`] = 1;
      }
    }

    const bsMatch = evidenceString.match(/BS=\[([^\]]+)\]/);
    if (bsMatch) {
      const bsValues = bsMatch[1].split(",").map((v) => parseInt(v.trim()));
      for (let i = 0; i < bsValues.length; i++) {
        if (bsValues[i] === 1) evidenceMap[`BS${i + 1}`] = 1;
      }
    }

    const bpMatch = evidenceString.match(/BP=\[([^\]]+)\]/);
    if (bpMatch) {
      const bpValues = bpMatch[1].split(",").map((v) => parseInt(v.trim()));
      for (let i = 0; i < bpValues.length; i++) {
        if (bpValues[i] === 1) evidenceMap[`BP${i + 1}`] = 1;
      }
    }

    return evidenceMap;
  };

  // Evidence box style based on category and presence
  const getEvidenceBoxStyle = (category, isPresent) => {
    // Base colors for each category
    const categoryColors = {
      PVS: { active: "#d32f2f", inactive: "#ffcdd2" }, // Red
      PS: { active: "#e53935", inactive: "#ef9a9a" }, // Light Red
      PM: { active: "#ff8f00", inactive: "#ffe0b2" }, // Orange
      PP: { active: "#ffb300", inactive: "#fff8e1" }, // Amber
      BA: { active: "#2e7d32", inactive: "#c8e6c9" }, // Green
      BS: { active: "#388e3c", inactive: "#e8f5e9" }, // Light Green
      BP: { active: "#43a047", inactive: "#f1f8e9" }, // Lighter Green
    };

    // Determine category color
    const prefix = category.substring(0, 2);
    const colorSet = categoryColors[prefix] || {
      active: "#9e9e9e",
      inactive: "#f5f5f5",
    };

    return {
      backgroundColor: isPresent ? colorSet.active : colorSet.inactive,
      color: isPresent ? "#ffffff" : "#626262",
      fontWeight: isPresent ? "bold" : "normal",
      padding: "4px 8px",
      borderRadius: "4px",
      margin: "2px",
      display: "inline-block",
      fontSize: "0.75rem",
      opacity: isPresent ? 1 : 0.6,
      boxShadow: isPresent ? "0px 2px 2px rgba(0,0,0,0.2)" : "none",
    };
  };

  // Descriptions for each ACMG criterion
  const criteriaDescriptions = {
    PVS1: "Null variant in a gene where LOF is a known mechanism of disease",
    PS1: "Same amino acid change as a previously established pathogenic variant",
    PS2: "De novo variant (with confirmed paternity and maternity)",
    PS3: "Well-established functional studies show a deleterious effect",
    PS4: "Variant prevalence in affected individuals significantly increased over controls",
    PS5: "Other well-established pathogenicity criterion",
    PM1: "Located in a mutational hot spot or critical functional domain",
    PM2: "Absent from controls in population databases",
    PM3: "For recessive disorders, detected in trans with a pathogenic variant",
    PM4: "Protein length changes due to in-frame indels or stop loss variants",
    PM5: "Novel missense at same position as another pathogenic missense variant",
    PM6: "Assumed de novo (without confirmed paternity and maternity)",
    PM7: "Other well-established moderate pathogenicity criterion",
    PP1: "Cosegregation with disease in multiple affected family members",
    PP2: "Missense in a gene with low rate of benign missense variants and common pathogenic missenses",
    PP3: "Multiple lines of computational evidence support deleterious effect",
    PP4: "Patient's phenotype or family history highly specific for gene",
    PP5: "Reputable source reports variant as pathogenic",
    PP6: "Other supporting pathogenicity criterion",
    BA1: "Allele frequency >5% in population databases",
    BS1: "Allele frequency greater than expected for disorder",
    BS2: "Observed in healthy adult with full penetrance expected at early age",
    BS3: "Well-established functional studies show no deleterious effect",
    BS4: "Lack of segregation in affected members of a family",
    BS5: "Other well-established benign criterion",
    BP1: "Missense in gene where primarily truncating variants cause disease",
    BP2: "Observed in trans with a pathogenic variant for dominant disorders or in cis with pathogenic variant",
    BP3: "In-frame indels in repetitive region without known function",
    BP4: "Multiple lines of computational evidence suggest no impact on gene",
    BP5: "Variant found in case with alternate molecular basis for disease",
    BP6: "Reputable source reports variant as benign",
    BP7: "Synonymous variant with no predicted splice impact",
    BP8: "Other supporting benign criterion",
  };

  /**
   * Classifies a variant according to ACMG/AMP guidelines based on evidence criteria
   * @param {Object} evidenceObj - Object containing the evidence criteria
   * @return {string} - Classification result (Pathogenic, Likely pathogenic, etc.)
   */
  const classifyACMG = (evidenceObj) => {
    if (!evidenceObj) return "Uncertain significance";

    // Count criteria by category
    const counts = {
      pvs: 0, // Very Strong pathogenic
      ps: 0, // Strong pathogenic
      pm: 0, // Moderate pathogenic
      pp: 0, // Supporting pathogenic
      ba: 0, // Stand-alone benign
      bs: 0, // Strong benign
      bp: 0, // Supporting benign
    };

    // Tally the evidence
    Object.keys(evidenceObj).forEach((key) => {
      if (key === "PVS1" && evidenceObj[key] === 1) counts.pvs += 1;
      else if (key === "BA1" && evidenceObj[key] === 1) counts.ba += 1;
      else if (key.startsWith("PS") && evidenceObj[key] === 1) counts.ps += 1;
      else if (key.startsWith("PM") && evidenceObj[key] === 1) counts.pm += 1;
      else if (key.startsWith("PP") && evidenceObj[key] === 1) counts.pp += 1;
      else if (key.startsWith("BS") && evidenceObj[key] === 1) counts.bs += 1;
      else if (key.startsWith("BP") && evidenceObj[key] === 1) counts.bp += 1;
    });

    // Implement ACMG classification rules

    // Pathogenic rules
    if (
      (counts.pvs >= 1 && counts.ps >= 1) || // 1 PVS + 1 PS
      (counts.pvs >= 1 && counts.pm >= 2) || // 1 PVS + 2 PM
      (counts.pvs >= 1 && counts.pm >= 1 && counts.pp >= 1) || // 1 PVS + 1 PM + 1 PP
      (counts.pvs >= 1 && counts.pp >= 2) || // 1 PVS + 2 PP
      counts.ps >= 2 || // 2 PS
      (counts.ps >= 1 && counts.pm >= 3) || // 1 PS + 3 PM
      (counts.ps >= 1 && counts.pm >= 2 && counts.pp >= 2) || // 1 PS + 2 PM + 2 PP
      (counts.ps >= 1 && counts.pm >= 1 && counts.pp >= 4) // 1 PS + 1 PM + 4 PP
    ) {
      return "Pathogenic";
    }

    // Likely pathogenic rules
    if (
      (counts.pvs >= 1 && counts.pm >= 1) || // 1 PVS + 1 PM
      (counts.pvs >= 1 && counts.pp >= 1) || // 1 PVS + 1 PP
      (counts.ps >= 1 && counts.pm >= 1) || // 1 PS + 1-2 PM
      (counts.ps >= 1 && counts.pp >= 2) || // 1 PS + ≥2 PP
      counts.pm >= 3 || // ≥3 PM
      (counts.pm >= 2 && counts.pp >= 2) || // 2 PM + ≥2 PP
      (counts.pm >= 1 && counts.pp >= 4) // 1 PM + ≥4 PP
    ) {
      return "Likely pathogenic";
    }

    // Benign rules
    if (
      counts.ba >= 1 || // 1 Stand-alone
      counts.bs >= 2 // ≥2 Strong
    ) {
      return "Benign";
    }

    // Likely benign rules
    if (
      (counts.bs >= 1 && counts.bp >= 1) || // 1 Strong + 1 supporting
      counts.bp >= 2 // ≥2 Supporting
    ) {
      return "Likely benign";
    }

    // If we have strong/moderate evidence in both directions, call it uncertain
    if ((counts.ps > 0 || counts.pm > 0) && counts.bs > 0) {
      return "Uncertain significance";
    }

    // Default
    return "Uncertain significance";
  };

  // Add this function near your other utility functions
  const evidenceCounts = (evidenceObj) => {
    if (!evidenceObj)
      return { pvs: 0, ps: 0, pm: 0, pp: 0, ba: 0, bs: 0, bp: 0 };

    // Count criteria by category
    const counts = {
      pvs: 0, // Very Strong pathogenic
      ps: 0, // Strong pathogenic
      pm: 0, // Moderate pathogenic
      pp: 0, // Supporting pathogenic
      ba: 0, // Stand-alone benign
      bs: 0, // Strong benign
      bp: 0, // Supporting benign
    };

    // Tally the evidence
    Object.keys(evidenceObj).forEach((key) => {
      if (key === "PVS1" && evidenceObj[key] === 1) counts.pvs += 1;
      else if (key === "BA1" && evidenceObj[key] === 1) counts.ba += 1;
      else if (key.startsWith("PS") && evidenceObj[key] === 1) counts.ps += 1;
      else if (key.startsWith("PM") && evidenceObj[key] === 1) counts.pm += 1;
      else if (key.startsWith("PP") && evidenceObj[key] === 1) counts.pp += 1;
      else if (key.startsWith("BS") && evidenceObj[key] === 1) counts.bs += 1;
      else if (key.startsWith("BP") && evidenceObj[key] === 1) counts.bp += 1;
    });

    return counts;
  };

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
            <Box sx={cardStyle(cardColors.variantInfo)}>
              <Box
                sx={{
                  bgcolor: cardColors.variantInfo.header,
                  p: 1,
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                }}
              >
                <Typography
                  color={cardColors.variantInfo.headerText}
                  variant="subtitle2"
                  fontWeight="bold"
                  align="center"
                >
                  Variant Information
                </Typography>
              </Box>

              <Box sx={{ mt: 0.5 }}>
                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    Chr:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.variant.chrom || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    Pos:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.variant.pos || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    Ref:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.variant.ref || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    Alt:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.variant.alt || "0"}
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5 }} />

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    HGVSG:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.hgvsg || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    HGVSC:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.hgvsc || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    HGVSP:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.hgvsp || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    Gene:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.gene_symbol || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    Consequence:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.consequence || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    Function:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.function || "N/A"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    Impact:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.impact || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    Transcript:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.feature || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    rsID:
                  </Typography>
                  {variant.rs_id ? (
                    <Link
                      href={`https://www.ncbi.nlm.nih.gov/snp/${variant.rs_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{
                        mr: 1,
                        color: "#1565c0",
                        fontSize: "0.8rem",
                      }}
                    >
                      {variant.rs_id}
                    </Link>
                  ) : (
                    <Typography
                      variant="body2"
                      color="#111111"
                      fontWeight="bold"
                    >
                      0
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* GNOMAD Frequencies Card */}
          <Grid item xs={12} md={3}>
            <Box sx={cardStyle(cardColors.gnomad)}>
              <Box
                sx={{
                  bgcolor: cardColors.gnomad.header,
                  p: 1,
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                }}
              >
                <Typography
                  color={cardColors.gnomad.headerText}
                  variant="subtitle2"
                  fontWeight="bold"
                  align="center"
                >
                  Allele Frequencies
                </Typography>
              </Box>
              <Box sx={dataRowStyle}>
                <Typography variant="body2" color="#555555" fontWeight="medium">
                  Sample Variant AF:
                </Typography>
                <Typography variant="body2" color="#111111" fontWeight="bold">
                  {variant.sample_specific.allele_frequency || "0"}
                </Typography>
              </Box>
              <Box sx={{ mt: 0.5 }}>
                {/* Turkish Genome Database section */}
                <Box sx={{ px: 2, py: 0.5, backgroundColor: "#edf7ed" }}>
                  <Typography
                    variant="body2"
                    color="#1b5e20"
                    fontWeight="medium"
                    align="center"
                  >
                    Turkish Genome Database
                  </Typography>
                </Box>
                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    TGD AF:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.tgd_af || "0"}
                  </Typography>
                </Box>

                {/* GNOMAD section */}
                <Box
                  sx={{
                    px: 2,
                    py: 0.5,
                    backgroundColor: "#e3f2fd",
                    mt: 1,
                    textAlign: "center",
                  }}
                >
                  <Link
                    href={`https://gnomad.broadinstitute.org/variant/${variant.variant.chrom}-${variant.variant.pos}-${variant.variant.ref}-${variant.variant.alt}?dataset=gnomad_r4`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{
                      mr: 1,
                      color: "#1565c0",
                      fontSize: "0.8rem",
                    }}
                  >
                    GNOMAD Genomes
                  </Link>
                </Box>
                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    Global:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.gnomadg_af || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    AFR:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.gnomadg_afr_af || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    AMR:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.gnomadg_amr_af || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    AMI:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.gnomadg_ami_af || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    ASJ:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.gnomadg_asj_af || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    EAS:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.gnomadg_eas_af || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    FIN:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.gnomadg_fin_af || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    NFE:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.gnomadg_nfe_af || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    SAS:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.gnomadg_sas_af || "0"}
                  </Typography>
                </Box>

                {variant.gnomad_other_frequencies && (
                  <Box sx={dataRowStyle}>
                    <Typography
                      variant="body2"
                      color="#555555"
                      fontWeight="medium"
                    >
                      Other:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#111111"
                      fontWeight="bold"
                    >
                      {variant.gnomad_other_frequencies}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          {/* In Silico Predictions Card */}
          <Grid item xs={12} md={3}>
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
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    SIFT:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.sift || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    PolyPhen:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.polyphen || "0"}
                  </Typography>
                </Box>

                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    AlphaMissense:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.alphamissense || "0"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Disease Associations Card */}
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Box sx={cardStyle(cardColors.disease, true)}>
              <Box
                sx={{
                  bgcolor: cardColors.disease.header,
                  p: 1,
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                }}
              >
                <Typography
                  color={cardColors.disease.headerText}
                  variant="subtitle2"
                  fontWeight="bold"
                  align="center"
                >
                  Disease Associations
                </Typography>
              </Box>

              <Grid container>
                {/* Clinical Significance Section */}
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ borderRight: { xs: "none", md: "1px solid #e8d9c6" } }}
                >
                  <Box
                    sx={{
                      ...dataRowStyle,
                      height: "100%",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="#555555"
                      fontWeight="medium"
                    >
                      Clinvar Clinical Significance:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#111111"
                      fontWeight="bold"
                    >
                      {variant.clinical_significance || "0"}
                    </Typography>
                  </Box>
                </Grid>

                {/* OMIM Section */}
                <Grid
                  item
                  xs={12}
                  md={2}
                  sx={{
                    borderRight: { xs: "none", md: "1px solid #e8d9c6" },
                    borderTop: { xs: "1px solid #e8d9c6", md: "none" },
                  }}
                >
                  <Box
                    sx={{
                      ...dataRowStyle,
                      height: "100%",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="#555555"
                      fontWeight="medium"
                    >
                      OMIM:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#111111"
                      fontWeight="bold"
                    >
                      {variant.omim || "0"}
                    </Typography>
                  </Box>
                </Grid>

                {/* Orphanet Section */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ borderTop: { xs: "1px solid #e8d9c6", md: "none" } }}
                >
                  <Box
                    sx={{
                      ...dataRowStyle,
                      height: "100%",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="#555555"
                      fontWeight="medium"
                      sx={{ alignSelf: "flex-start", pt: 0.5 }}
                    >
                      Orphanet:
                    </Typography>
                    {variant.orpha_info ? (
                      <Box
                        sx={{ display: "flex", flexDirection: "column", ml: 2 }}
                      >
                        {(() => {
                          const parts = variant.orpha_info.split("|");
                          const fields = {
                            disease: parts[0],
                            prevalence: parts[1],
                            inheritance: parts[2],
                            onsetAge: parts[3],
                            omimId: parts[4],
                          };

                          return (
                            <>
                              <Typography
                                variant="body2"
                                color="#111111"
                                fontWeight="bold"
                              >
                                {fields.disease}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                  mt: 0.5,
                                }}
                              >
                                <Box
                                  sx={{
                                    backgroundColor: "#e3f2fd",
                                    p: 0.5,
                                    borderRadius: 1,
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  {fields.prevalence}
                                </Box>
                                <Box
                                  sx={{
                                    backgroundColor: "#e8f5e9",
                                    p: 0.5,
                                    borderRadius: 1,
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  {fields.inheritance}
                                </Box>
                                <Box
                                  sx={{
                                    backgroundColor: "#fff8e1",
                                    p: 0.5,
                                    borderRadius: 1,
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  {fields.onsetAge.replace(/<br>/g, ", ")}
                                </Box>
                                {fields.omimId && (
                                  <Box
                                    sx={{
                                      backgroundColor: "#fce4ec",
                                      p: 0.5,
                                      borderRadius: 1,
                                      fontSize: "0.7rem",
                                    }}
                                  >
                                    {fields.omimId}
                                  </Box>
                                )}
                              </Box>
                            </>
                          );
                        })()}
                      </Box>
                    ) : (
                      <Typography
                        variant="body2"
                        color="#111111"
                        fontWeight="bold"
                      >
                        0
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* InterVar Evidence Card */}
          <Grid item xs={12} sx={{ mt: 1 }}>
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
                        onClick={handleSaveIntervar}
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
                        onClick={handleCancelIntervar}
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
                      onClick={handleEditIntervar}
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
                              {/* Always show PVS1, with appropriate styling based on presence */}
                              <Tooltip
                                title={criteriaDescriptions.PVS1}
                                arrow
                                placement="top"
                              >
                                <Box
                                  onClick={() =>
                                    isEditingIntervar && toggleCriterion("PVS1")
                                  }
                                  sx={{
                                    ...getEvidenceBoxStyle(
                                      "PVS",
                                      (isEditingIntervar
                                        ? editedEvidence?.PVS1
                                        : parseInterVarEvidence(
                                            variant.evidence_intervar
                                          )?.PVS1) === 1
                                    ),
                                    backgroundColor:
                                      (isEditingIntervar
                                        ? editedEvidence?.PVS1
                                        : parseInterVarEvidence(
                                            variant.evidence_intervar
                                          )?.PVS1) === 1
                                        ? "#d32f2f"
                                        : "#ffcdd2",
                                    color:
                                      (isEditingIntervar
                                        ? editedEvidence?.PVS1
                                        : parseInterVarEvidence(
                                            variant.evidence_intervar
                                          )?.PVS1) === 1
                                        ? "#ffffff"
                                        : "#626262",
                                    transform:
                                      (isEditingIntervar
                                        ? editedEvidence?.PVS1
                                        : parseInterVarEvidence(
                                            variant.evidence_intervar
                                          )?.PVS1) === 1
                                        ? "scale(1.1)"
                                        : "none",
                                    transition: "transform 0.2s",
                                    boxShadow:
                                      (isEditingIntervar
                                        ? editedEvidence?.PVS1
                                        : parseInterVarEvidence(
                                            variant.evidence_intervar
                                          )?.PVS1) === 1
                                        ? "0 4px 8px rgba(211, 47, 47, 0.4)"
                                        : "none",
                                    cursor: isEditingIntervar
                                      ? "pointer"
                                      : "default",
                                    "&:hover": isEditingIntervar
                                      ? {
                                          opacity: 0.85,
                                          transform: "scale(1.15)",
                                        }
                                      : {},
                                  }}
                                >
                                  PVS1
                                </Box>
                              </Tooltip>
                            </Box>
                          </Box>

                          {/* Strong Evidence (PS) */}
                          <Box sx={{ mb: 1 }}>
                            <Typography
                              variant="caption"
                              color="#ad1457"
                              fontWeight="bold"
                            >
                              Strong:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                mt: 0.5,
                              }}
                            >
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Tooltip
                                  key={`PS${i}`}
                                  title={
                                    criteriaDescriptions[`PS${i}`] || `PS${i}`
                                  }
                                  arrow
                                  placement="top"
                                >
                                  <Box
                                    onClick={() =>
                                      isEditingIntervar &&
                                      toggleCriterion(`PS${i}`)
                                    }
                                    sx={{
                                      ...getEvidenceBoxStyle(
                                        `PS${i}`,
                                        (isEditingIntervar
                                          ? editedEvidence?.[`PS${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`PS${i}`]) === 1
                                      ),
                                      transform:
                                        (isEditingIntervar
                                          ? editedEvidence?.[`PS${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`PS${i}`]) === 1
                                          ? "scale(1.05)"
                                          : "none",
                                      transition: "transform 0.2s",
                                      boxShadow:
                                        (isEditingIntervar
                                          ? editedEvidence?.[`PS${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`PS${i}`]) === 1
                                          ? "0 3px 6px rgba(229, 57, 53, 0.3)"
                                          : "none",
                                      cursor: isEditingIntervar
                                        ? "pointer"
                                        : "default",
                                      "&:hover": isEditingIntervar
                                        ? {
                                            opacity: 0.85,
                                            transform: "scale(1.15)",
                                          }
                                        : {},
                                    }}
                                  >
                                    PS{i}
                                  </Box>
                                </Tooltip>
                              ))}
                            </Box>
                          </Box>

                          {/* Moderate Evidence (PM) */}
                          <Box sx={{ mb: 1 }}>
                            <Typography
                              variant="caption"
                              color="#f57c00"
                              fontWeight="bold"
                            >
                              Moderate:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                mt: 0.5,
                              }}
                            >
                              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <Tooltip
                                  key={`PM${i}`}
                                  title={
                                    criteriaDescriptions[`PM${i}`] || `PM${i}`
                                  }
                                  arrow
                                  placement="top"
                                >
                                  <Box
                                    onClick={() =>
                                      isEditingIntervar &&
                                      toggleCriterion(`PM${i}`)
                                    }
                                    sx={{
                                      ...getEvidenceBoxStyle(
                                        `PM${i}`,
                                        (isEditingIntervar
                                          ? editedEvidence?.[`PM${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`PM${i}`]) === 1
                                      ),
                                      transform:
                                        (isEditingIntervar
                                          ? editedEvidence?.[`PM${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`PM${i}`]) === 1
                                          ? "scale(1.05)"
                                          : "none",
                                      transition: "transform 0.2s",
                                      boxShadow:
                                        (isEditingIntervar
                                          ? editedEvidence?.[`PM${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`PM${i}`]) === 1
                                          ? "0 3px 6px rgba(255, 143, 0, 0.3)"
                                          : "none",
                                      cursor: isEditingIntervar
                                        ? "pointer"
                                        : "default",
                                      "&:hover": isEditingIntervar
                                        ? {
                                            opacity: 0.85,
                                            transform: "scale(1.15)",
                                          }
                                        : {},
                                    }}
                                  >
                                    PM{i}
                                  </Box>
                                </Tooltip>
                              ))}
                            </Box>
                          </Box>

                          {/* Supporting Evidence (PP) */}
                          <Box sx={{ mb: 1 }}>
                            <Typography
                              variant="caption"
                              color="#ffa000"
                              fontWeight="bold"
                            >
                              Supporting:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                mt: 0.5,
                              }}
                            >
                              {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Tooltip
                                  key={`PP${i}`}
                                  title={
                                    criteriaDescriptions[`PP${i}`] || `PP${i}`
                                  }
                                  arrow
                                  placement="top"
                                >
                                  <Box
                                    onClick={() =>
                                      isEditingIntervar &&
                                      toggleCriterion(`PP${i}`)
                                    }
                                    sx={{
                                      ...getEvidenceBoxStyle(
                                        `PP${i}`,
                                        (isEditingIntervar
                                          ? editedEvidence?.[`PP${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`PP${i}`]) === 1
                                      ),
                                      transform:
                                        (isEditingIntervar
                                          ? editedEvidence?.[`PP${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`PP${i}`]) === 1
                                          ? "scale(1.05)"
                                          : "none",
                                      transition: "transform 0.2s",
                                      boxShadow:
                                        (isEditingIntervar
                                          ? editedEvidence?.[`PP${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`PP${i}`]) === 1
                                          ? "0 3px 6px rgba(255, 179, 0, 0.3)"
                                          : "none",
                                      cursor: isEditingIntervar
                                        ? "pointer"
                                        : "default",
                                      "&:hover": isEditingIntervar
                                        ? {
                                            opacity: 0.85,
                                            transform: "scale(1.15)",
                                          }
                                        : {},
                                    }}
                                  >
                                    PP{i}
                                  </Box>
                                </Tooltip>
                              ))}
                            </Box>
                          </Box>
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
                          <Box sx={{ mb: 1 }}>
                            <Typography
                              variant="caption"
                              color="#1b5e20"
                              fontWeight="bold"
                            >
                              Stand-Alone:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                mt: 0.5,
                              }}
                            >
                              {/* Always show BA1, with appropriate styling based on presence */}
                              <Tooltip
                                title={criteriaDescriptions.BA1}
                                arrow
                                placement="top"
                              >
                                <Box
                                  onClick={() =>
                                    isEditingIntervar && toggleCriterion("BA1")
                                  }
                                  sx={{
                                    ...getEvidenceBoxStyle(
                                      "BA",
                                      (isEditingIntervar
                                        ? editedEvidence?.BA1
                                        : parseInterVarEvidence(
                                            variant.evidence_intervar
                                          )?.BA1) === 1
                                    ),
                                    backgroundColor:
                                      (isEditingIntervar
                                        ? editedEvidence?.BA1
                                        : parseInterVarEvidence(
                                            variant.evidence_intervar
                                          )?.BA1) === 1
                                        ? "#2e7d32"
                                        : "#c8e6c9",
                                    color:
                                      (isEditingIntervar
                                        ? editedEvidence?.BA1
                                        : parseInterVarEvidence(
                                            variant.evidence_intervar
                                          )?.BA1) === 1
                                        ? "#ffffff"
                                        : "#626262",
                                    transform:
                                      (isEditingIntervar
                                        ? editedEvidence?.BA1
                                        : parseInterVarEvidence(
                                            variant.evidence_intervar
                                          )?.BA1) === 1
                                        ? "scale(1.1)"
                                        : "none",
                                    transition: "transform 0.2s",
                                    boxShadow:
                                      (isEditingIntervar
                                        ? editedEvidence?.BA1
                                        : parseInterVarEvidence(
                                            variant.evidence_intervar
                                          )?.BA1) === 1
                                        ? "0 4px 8px rgba(46, 125, 50, 0.4)"
                                        : "none",
                                    cursor: isEditingIntervar
                                      ? "pointer"
                                      : "default",
                                    "&:hover": isEditingIntervar
                                      ? {
                                          opacity: 0.85,
                                          transform: "scale(1.15)",
                                        }
                                      : {},
                                  }}
                                >
                                  BA1
                                </Box>
                              </Tooltip>
                            </Box>
                          </Box>

                          {/* Strong Evidence (BS) */}
                          <Box sx={{ mb: 1 }}>
                            <Typography
                              variant="caption"
                              color="#2e7d32"
                              fontWeight="bold"
                            >
                              Strong:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                mt: 0.5,
                              }}
                            >
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Tooltip
                                  key={`BS${i}`}
                                  title={
                                    criteriaDescriptions[`BS${i}`] || `BS${i}`
                                  }
                                  arrow
                                  placement="top"
                                >
                                  <Box
                                    onClick={() =>
                                      isEditingIntervar &&
                                      toggleCriterion(`BS${i}`)
                                    }
                                    sx={{
                                      ...getEvidenceBoxStyle(
                                        `BS${i}`,
                                        (isEditingIntervar
                                          ? editedEvidence?.[`BS${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`BS${i}`]) === 1
                                      ),
                                      transform:
                                        (isEditingIntervar
                                          ? editedEvidence?.[`BS${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`BS${i}`]) === 1
                                          ? "scale(1.05)"
                                          : "none",
                                      transition: "transform 0.2s",
                                      boxShadow:
                                        (isEditingIntervar
                                          ? editedEvidence?.[`BS${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`BS${i}`]) === 1
                                          ? "0 3px 6px rgba(56, 142, 60, 0.3)"
                                          : "none",
                                      cursor: isEditingIntervar
                                        ? "pointer"
                                        : "default",
                                      "&:hover": isEditingIntervar
                                        ? {
                                            opacity: 0.85,
                                            transform: "scale(1.15)",
                                          }
                                        : {},
                                    }}
                                  >
                                    BS{i}
                                  </Box>
                                </Tooltip>
                              ))}
                            </Box>
                          </Box>

                          {/* Supporting Evidence (BP) */}
                          <Box>
                            <Typography
                              variant="caption"
                              color="#388e3c"
                              fontWeight="bold"
                            >
                              Supporting:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                mt: 0.5,
                              }}
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <Tooltip
                                  key={`BP${i}`}
                                  title={
                                    criteriaDescriptions[`BP${i}`] || `BP${i}`
                                  }
                                  arrow
                                  placement="top"
                                >
                                  <Box
                                    onClick={() =>
                                      isEditingIntervar &&
                                      toggleCriterion(`BP${i}`)
                                    }
                                    sx={{
                                      ...getEvidenceBoxStyle(
                                        `BP${i}`,
                                        (isEditingIntervar
                                          ? editedEvidence?.[`BP${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`BP${i}`]) === 1
                                      ),
                                      transform:
                                        (isEditingIntervar
                                          ? editedEvidence?.[`BP${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`BP${i}`]) === 1
                                          ? "scale(1.05)"
                                          : "none",
                                      transition: "transform 0.2s",
                                      boxShadow:
                                        (isEditingIntervar
                                          ? editedEvidence?.[`BP${i}`]
                                          : parseInterVarEvidence(
                                              variant.evidence_intervar
                                            )?.[`BP${i}`]) === 1
                                          ? "0 3px 6px rgba(67, 160, 71, 0.3)"
                                          : "none",
                                      cursor: isEditingIntervar
                                        ? "pointer"
                                        : "default",
                                      "&:hover": isEditingIntervar
                                        ? {
                                            opacity: 0.85,
                                            transform: "scale(1.15)",
                                          }
                                        : {},
                                    }}
                                  >
                                    BP{i}
                                  </Box>
                                </Tooltip>
                              ))}
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box
                        sx={{ mt: 1.5, pt: 1, borderTop: "1px solid #eaeaea" }}
                      >
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

                    {/* Right Column - Classification Results */}
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
                        {/* Classification Result Section */}
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color="#3b6793"
                          sx={{ mb: 2 }}
                        >
                          Classification Result
                        </Typography>

                        {isEditingIntervar ? (
                          // Dropdown for manual classification when in edit mode
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
                              onChange={(e) =>
                                setManualClassification(e.target.value || null)
                              }
                              sx={{
                                width: "100%",
                                p: 1.5,
                                borderRadius: "8px",
                                border: "2px solid rgba(59, 103, 147, 0.5)",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: (() => {
                                  switch (manualClassification) {
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
                                })(),
                                backgroundColor: "white",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                "&:focus": {
                                  outline: "none",
                                  borderColor: "#3b6793",
                                  boxShadow:
                                    "0 0 0 3px rgba(59, 103, 147, 0.2)",
                                },
                              }}
                            >
                              <option value="">
                                Use ACMG rules (automatic)
                              </option>
                              <option value="Pathogenic">Pathogenic</option>
                              <option value="Likely pathogenic">
                                Likely pathogenic
                              </option>
                              <option value="Uncertain significance">
                                Uncertain significance
                              </option>
                              <option value="Likely benign">
                                Likely benign
                              </option>
                              <option value="Benign">Benign</option>
                            </Box>
                            {manualClassification && (
                              <Typography
                                variant="caption"
                                color="#d32f2f"
                                sx={{ display: "block", mt: 1 }}
                              >
                                * Manual override will be used instead of ACMG
                                rules
                              </Typography>
                            )}
                            <Typography
                              variant="caption"
                              color="#666666"
                              sx={{ display: "block", mt: 0.5 }}
                            >
                              ACMG auto-classification:{" "}
                              {classifyACMG(editedEvidence)}
                            </Typography>
                          </Box>
                        ) : (
                          // Standard display when not in edit mode
                          variant.intervar_classification && (
                            <Box
                              sx={{
                                p: 2,
                                borderRadius: "8px",
                                backgroundColor: (() => {
                                  switch (variant.intervar_classification) {
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
                                })(),
                                border: (() => {
                                  switch (variant.intervar_classification) {
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
                                })(),
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
                                  color: (() => {
                                    switch (variant.intervar_classification) {
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
                                  })(),
                                }}
                              >
                                {variant.intervar_classification}
                              </Typography>
                              {variant.classification_method === "manual" && (
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
                      </Box>

                      {isEditingIntervar ? (
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
                          <Typography
                            variant="caption"
                            fontWeight="medium"
                            color="#333333"
                          >
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
                              <strong>Pathogenic</strong>: 1 PVS + (1 PS or 2 PM
                              or 1 PM+1 PP or 2 PP) <i>or</i> 2 PS <i>or</i> 1
                              PS + (3 PM or 2 PM+2 PP or 1 PM+4 PP)
                            </Box>
                            <Box component="li" sx={{ mb: 0.5 }}>
                              <strong>Likely pathogenic</strong>: 1 PVS + 1
                              PM/PP <i>or</i> 1 PS + 1-2 PM/PP <i>or</i> 3+ PM{" "}
                              <i>or</i> 2 PM + 2+ PP <i>or</i> 1 PM + 4+ PP
                            </Box>
                            <Box component="li" sx={{ mb: 0.5 }}>
                              <strong>Benign</strong>: 1 BA1 <i>or</i> 2+ BS
                            </Box>
                            <Box component="li" sx={{ mb: 0.5 }}>
                              <strong>Likely benign</strong>: 1 BS + 1 BP{" "}
                              <i>or</i> 2+ BP
                            </Box>
                            <Box component="li">
                              <strong>Uncertain significance</strong>: All other
                              criteria combinations
                            </Box>
                          </Box>
                          <Box sx={{ mt: 1 }}>
                            <Typography
                              variant="caption"
                              sx={{ color: "#777777" }}
                            >
                              Current evidence count:{" "}
                              {Object.entries(
                                evidenceCounts(editedEvidence)
                              ).map(([key, count]) =>
                                count > 0
                                  ? `${key.toUpperCase()}=${count} `
                                  : ""
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        variant.intervar_classification && (
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
                            <Typography
                              variant="caption"
                              fontWeight="medium"
                              color="#333333"
                            >
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
                                <strong>Pathogenic</strong>: 1 PVS + (1 PS or 2
                                PM or 1 PM+1 PP or 2 PP) <i>or</i> 2 PS{" "}
                                <i>or</i> 1 PS + (3 PM or 2 PM+2 PP or 1 PM+4
                                PP)
                              </Box>
                              <Box component="li" sx={{ mb: 0.5 }}>
                                <strong>Likely pathogenic</strong>: 1 PVS + 1
                                PM/PP <i>or</i> 1 PS + 1-2 PM/PP <i>or</i> 3+ PM{" "}
                                <i>or</i> 2 PM + 2+ PP <i>or</i> 1 PM + 4+ PP
                              </Box>
                              <Box component="li" sx={{ mb: 0.5 }}>
                                <strong>Benign</strong>: 1 BA1 <i>or</i> 2+ BS
                              </Box>
                              <Box component="li" sx={{ mb: 0.5 }}>
                                <strong>Likely benign</strong>: 1 BS + 1 BP{" "}
                                <i>or</i> 2+ BP
                              </Box>
                              <Box component="li">
                                <strong>Uncertain significance</strong>: All
                                other criteria combinations
                              </Box>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                              <Typography
                                variant="caption"
                                sx={{ color: "#777777" }}
                              >
                                Current evidence count:{" "}
                                {Object.entries(
                                  evidenceCounts(
                                    parseInterVarEvidence(
                                      variant.evidence_intervar
                                    )
                                  )
                                ).map(([key, count]) =>
                                  count > 0
                                    ? `${key.toUpperCase()}=${count} `
                                    : ""
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        )
                      )}
                    </Grid>
                  </Grid>
                ) : (
                  <Typography variant="body2" color="#666666" align="center">
                    No InterVar evidence available
                  </Typography>
                )}
              </Box>
            </Box>
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
