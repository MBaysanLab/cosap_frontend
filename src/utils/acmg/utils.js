/**
 * Utility functions for ACMG classification and evidence handling
 */

/**
 * Parses InterVar evidence string into object format
 * @param {string} evidenceString - InterVar evidence string
 * @return {Object|null} - Evidence as an object with criteria as keys
 */
export const parseInterVarEvidence = (evidenceString) => {
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

/**
 * Builds InterVar evidence string from object representation
 * @param {Object} evidenceObj - Evidence as an object with criteria as keys
 * @return {string} - InterVar evidence string
 */
export const buildInterVarEvidenceString = (evidenceObj) => {
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

/**
 * Count evidence by category
 * @param {Object|string} evidence - Evidence object or InterVar evidence string
 * @return {Object} - Counts of evidence by category
 */
export const evidenceCounts = (evidence) => {
  const evidenceObj =
    typeof evidence === "string" ? parseInterVarEvidence(evidence) : evidence;

  if (!evidenceObj) return { pvs: 0, ps: 0, pm: 0, pp: 0, ba: 0, bs: 0, bp: 0 };

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

/**
 * Classifies a variant according to ACMG/AMP guidelines based on evidence criteria
 * @param {Object|string} evidence - Evidence object or InterVar evidence string
 * @return {string} - Classification result (Pathogenic, Likely pathogenic, etc.)
 */
export const classifyACMG = (evidence) => {
  const evidenceObj =
    typeof evidence === "string" ? parseInterVarEvidence(evidence) : evidence;

  if (!evidenceObj) return "Uncertain significance";

  const counts = evidenceCounts(evidenceObj);

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

/**
 * Descriptions for each ACMG criterion
 */
export const criteriaDescriptions = {
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
