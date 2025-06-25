/**
 * Get style configuration for a card
 * @param {object} colorSet - Object containing color configuration for the card
 * @param {boolean} preventScroll - Whether to prevent scroll overflow
 * @return {object} - Style object for the card
 */
export const getCardStyle = (colorSet, preventScroll = false) => ({
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${colorSet.border}`,
  borderRadius: 8,
  backgroundColor: "#ffffff",
  height: "100%",
  overflow: preventScroll ? "hidden" : "auto",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
});

/**
 * Get style for data rows in cards
 * @return {object} - Style object for data rows
 */
export const getDataRowStyle = () => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  px: 2,
  py: 0.5,
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
});

/**
 * Get style for evidence boxes
 * @param {string} category - Evidence category code (e.g., "PS1", "PM2")
 * @param {boolean} isPresent - Whether the evidence is present/active
 * @return {object} - Style object for the evidence box
 */
export const getEvidenceBoxStyle = (category, isPresent) => {
  // Base styles
  const baseStyle = {
    px: 1,
    py: 0.5,
    borderRadius: 1,
    fontSize: "0.75rem",
    fontWeight: "medium",
    textAlign: "center",
    minWidth: 36,
  };

  // Category-specific colors
  let colors = {
    active: "#f5f5f5",
    inactive: "#f5f5f5",
    text: "#626262",
  };

  if (category.startsWith("PVS")) {
    colors = {
      active: "#d32f2f",
      inactive: "#ffcdd2",
      text: isPresent ? "#ffffff" : "#626262",
    };
  } else if (category.startsWith("PS")) {
    colors = {
      active: "#e53935",
      inactive: "#ffcdd2",
      text: isPresent ? "#ffffff" : "#626262",
    };
  } else if (category.startsWith("PM")) {
    colors = {
      active: "#f57c00",
      inactive: "#ffe0b2",
      text: isPresent ? "#ffffff" : "#626262",
    };
  } else if (category.startsWith("PP")) {
    colors = {
      active: "#ffa000",
      inactive: "#ffecb3",
      text: isPresent ? "#ffffff" : "#626262",
    };
  } else if (category.startsWith("BA")) {
    colors = {
      active: "#2e7d32",
      inactive: "#c8e6c9",
      text: isPresent ? "#ffffff" : "#626262",
    };
  } else if (category.startsWith("BS")) {
    colors = {
      active: "#388e3c",
      inactive: "#c8e6c9",
      text: isPresent ? "#ffffff" : "#626262",
    };
  } else if (category.startsWith("BP")) {
    colors = {
      active: "#43a047",
      inactive: "#c8e6c9",
      text: isPresent ? "#ffffff" : "#626262",
    };
  }

  return {
    ...baseStyle,
    backgroundColor: isPresent ? colors.active : colors.inactive,
    color: colors.text,
  };
};
