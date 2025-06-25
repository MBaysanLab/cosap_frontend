/**
 * Parses the InterVar evidence string into an object
 * @param {string} evidenceString - The InterVar evidence string from the variant
 * @return {object|null} An object mapping criteria to their values, or null if no evidence
 */
export const parseInterVarEvidence = (evidenceString) => {
  if (!evidenceString) return null;

  const result = {};
  const parts = evidenceString.split(" ");

  // Handle standalone PVS1 and BA1
  parts.forEach((part) => {
    if (part.startsWith("PVS1=")) {
      const value = parseInt(part.split("=")[1]);
      if (value === 1) result.PVS1 = 1;
    } else if (part.startsWith("BA1=")) {
      const value = parseInt(part.split("=")[1]);
      if (value === 1) result.BA1 = 1;
    }
  });

  // Handle PS, PM, PP, BS, BP arrays
  const patterns = {
    PS: /PS=\[(.*?)\]/,
    PM: /PM=\[(.*?)\]/,
    PP: /PP=\[(.*?)\]/,
    BS: /BS=\[(.*?)\]/,
    BP: /BP=\[(.*?)\]/,
  };

  Object.entries(patterns).forEach(([prefix, pattern]) => {
    const match = evidenceString.match(pattern);
    if (match) {
      const values = match[1].split(",").map((v) => parseInt(v.trim()));
      values.forEach((value, index) => {
        if (value === 1) {
          result[`${prefix}${index + 1}`] = 1;
        }
      });
    }
  });

  return result;
};

/**
 * Builds an InterVar evidence string from an evidence object
 * @param {object} evidenceObj - Object mapping criteria to their values
 * @return {string} The formatted InterVar evidence string
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
 * Classifies a variant according to ACMG/AMP guidelines based on evidence criteria
 * @param {object} evidenceObj - Object containing the evidence criteria
 * @return {string} - Classification result (Pathogenic, Likely pathogenic, etc.)
 */
export const classifyACMG = (evidenceObj) => {
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
  if (counts.ba >= 1 || counts.bs >= 2) {
    // 1 Stand-alone or ≥2 Strong
    return "Benign";
  }

  // Likely benign rules
  if ((counts.bs >= 1 && counts.bp >= 1) || counts.bp >= 2) {
    // 1 Strong + 1 supporting or ≥2 Supporting
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
 * Counts the number of evidence criteria by category
 * @param {object} evidenceObj - Object containing the evidence criteria
 * @return {object} - Object with counts for each category
 */
export const evidenceCounts = (evidenceObj) => {
  if (!evidenceObj) return {};

  const counts = {
    pvs: 0,
    ps: 0,
    pm: 0,
    pp: 0,
    ba: 0,
    bs: 0,
    bp: 0,
  };

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
