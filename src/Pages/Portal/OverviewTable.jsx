import React from "react";
import { Box, Divider, Grid, Tooltip, Typography } from "@mui/material";

function OverviewTable(props) {
  const [variant, setVariant] = React.useState(null);

  React.useEffect(() => {
    setVariant(props.variant);
  }, [props.variant]);

  // Color palette for different card types
  const cardColors = {
    variantInfo: {
      header: "rgba(74, 109, 167, 0.7)",
      headerText: "#ffffff",
      border: "#c6d4ea",
    },
    gnomad: {
      header: "rgba(91, 140, 90, 0.7)",
      headerText: "#ffffff",
      border: "#d0e8cf",
    },
    inSilico: {
      header: "rgba(156, 107, 140, 0.7)",
      headerText: "#ffffff",
      border: "#e8d0df",
    },
    disease: {
      header: "rgba(161, 124, 78, 0.7)",
      headerText: "#ffffff",
      border: "#e8d9c6",
    },
    intervar: {
      header: "rgba(59, 103, 147, 0.7)",
      headerText: "#ffffff",
      border: "#c2d5e8",
    },
  };

  // Common style for all card containers
  const cardStyle = (colorSet) => ({
    display: "flex",
    flexDirection: "column",
    p: 0,
    height: "100%",
    border: `1px solid ${colorSet.border}`,
    borderRadius: 2,
    background: "#FFFFFF",
    overflow: "auto",
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
          <Grid item xs={12} md={4}>
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
                    {variant.variant.chrom || "N/A"}
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
                    {variant.variant.pos || "N/A"}
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
                    {variant.variant.ref || "N/A"}
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
                    {variant.variant.alt || "N/A"}
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
                    {variant.hgvsg || "N/A"}
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
                    {variant.gene_symbol || "N/A"}
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
                    {variant.consequence || "N/A"}
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
                    {variant.feature || "N/A"}
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
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {variant.rs_id || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* GNOMAD Frequencies Card */}
          <Grid item xs={12} md={4}>
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
                  VAF:
                </Typography>
                <Typography variant="body2" color="#111111" fontWeight="bold">
                  {variant.vaf || "N/A"}
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
                    {variant.tgd_af || "N/A"}
                  </Typography>
                </Box>

                {/* GNOMAD section */}
                <Box sx={{ px: 2, py: 0.5, backgroundColor: "#e3f2fd", mt: 1 }}>
                  <Typography
                    variant="body2"
                    color="#0d47a1"
                    fontWeight="medium"
                    align="center"
                  >
                    GNOMAD Genome
                  </Typography>
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
                    {variant.gnomadg_af || "N/A"}
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
                    {variant.gnomadg_afr_af || "N/A"}
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
                    {variant.gnomadg_amr_af || "N/A"}
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
                    {variant.gnomadg_ami_af || "N/A"}
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
                    {variant.gnomadg_asj_af || "N/A"}
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
                    {variant.gnomadg_eas_af || "N/A"}
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
                    {variant.gnomadg_fin_af || "N/A"}
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
                    {variant.gnomadg_nfe_af || "N/A"}
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
                    {variant.gnomadg_sas_af || "N/A"}
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
          <Grid item xs={12} md={4}>
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
                    {variant.sift || "N/A"}
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
                    {variant.polyphen || "N/A"}
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
                    {variant.alphamissense || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Disease Associations Card */}
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Box sx={cardStyle(cardColors.disease)}>
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
                <Grid item xs={12} md={6}>
                  <Box sx={dataRowStyle}>
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
                      {variant.omim || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={dataRowStyle}>
                    <Typography
                      variant="body2"
                      color="#555555"
                      fontWeight="medium"
                    >
                      Orphanet:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#111111"
                      fontWeight="bold"
                    >
                      {variant.orphanet || "N/A"}
                    </Typography>
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
                }}
              >
                <Typography
                  color={cardColors.intervar.headerText}
                  variant="subtitle2"
                  fontWeight="bold"
                  align="center"
                >
                  InterVar ACMG Evidence
                </Typography>
              </Box>

              <Box sx={{ p: 1.5 }}>
                {variant.evidence_intervar ? (
                  <>
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
                                sx={{
                                  ...getEvidenceBoxStyle(
                                    "PVS",
                                    parseInterVarEvidence(
                                      variant.evidence_intervar
                                    )?.PVS1 === 1
                                  ),
                                  transform:
                                    parseInterVarEvidence(
                                      variant.evidence_intervar
                                    )?.PVS1 === 1
                                      ? "scale(1.1)"
                                      : "none",
                                  transition: "transform 0.2s",
                                  boxShadow:
                                    parseInterVarEvidence(
                                      variant.evidence_intervar
                                    )?.PVS1 === 1
                                      ? "0 4px 8px rgba(211, 47, 47, 0.4)"
                                      : "none",
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
                                  sx={{
                                    ...getEvidenceBoxStyle(
                                      `PS${i}`,
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`PS${i}`] === 1
                                    ),
                                    transform:
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`PS${i}`] === 1
                                        ? "scale(1.05)"
                                        : "none",
                                    transition: "transform 0.2s",
                                    boxShadow:
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`PS${i}`] === 1
                                        ? "0 3px 6px rgba(229, 57, 53, 0.3)"
                                        : "none",
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
                                  sx={{
                                    ...getEvidenceBoxStyle(
                                      `PM${i}`,
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`PM${i}`] === 1
                                    ),
                                    transform:
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`PM${i}`] === 1
                                        ? "scale(1.05)"
                                        : "none",
                                    transition: "transform 0.2s",
                                    boxShadow:
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`PM${i}`] === 1
                                        ? "0 3px 6px rgba(255, 143, 0, 0.3)"
                                        : "none",
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
                                  sx={{
                                    ...getEvidenceBoxStyle(
                                      `PP${i}`,
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`PP${i}`] === 1
                                    ),
                                    transform:
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`PP${i}`] === 1
                                        ? "scale(1.05)"
                                        : "none",
                                    transition: "transform 0.2s",
                                    boxShadow:
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`PP${i}`] === 1
                                        ? "0 3px 6px rgba(255, 179, 0, 0.3)"
                                        : "none",
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
                                sx={{
                                  ...getEvidenceBoxStyle(
                                    "BA",
                                    parseInterVarEvidence(
                                      variant.evidence_intervar
                                    )?.BA1 === 1
                                  ),
                                  transform:
                                    parseInterVarEvidence(
                                      variant.evidence_intervar
                                    )?.BA1 === 1
                                      ? "scale(1.1)"
                                      : "none",
                                  transition: "transform 0.2s",
                                  boxShadow:
                                    parseInterVarEvidence(
                                      variant.evidence_intervar
                                    )?.BA1 === 1
                                      ? "0 4px 8px rgba(46, 125, 50, 0.4)"
                                      : "none",
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
                                  sx={{
                                    ...getEvidenceBoxStyle(
                                      `BS${i}`,
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`BS${i}`] === 1
                                    ),
                                    transform:
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`BS${i}`] === 1
                                        ? "scale(1.05)"
                                        : "none",
                                    transition: "transform 0.2s",
                                    boxShadow:
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`BS${i}`] === 1
                                        ? "0 3px 6px rgba(56, 142, 60, 0.3)"
                                        : "none",
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
                                  sx={{
                                    ...getEvidenceBoxStyle(
                                      `BP${i}`,
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`BP${i}`] === 1
                                    ),
                                    transform:
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`BP${i}`] === 1
                                        ? "scale(1.05)"
                                        : "none",
                                    transition: "transform 0.2s",
                                    boxShadow:
                                      parseInterVarEvidence(
                                        variant.evidence_intervar
                                      )?.[`BP${i}`] === 1
                                        ? "0 3px 6px rgba(67, 160, 71, 0.3)"
                                        : "none",
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
                        color="#444444"
                        align="center"
                      >
                        Hover over each criterion for description
                      </Typography>
                    </Box>
                  </>
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
    </Grid>
  );
}

export default OverviewTable;
