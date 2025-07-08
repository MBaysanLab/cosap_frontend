/**
 * Style constants for cards in the Overview table
 */

// Color palette for different card types
export const cardColors = {
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
export const cardStyle = (colorSet, preventScroll = false) => ({
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
export const dataRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  px: 2,
  py: 0.5,
  "&:nth-of-type(even)": {
    backgroundColor: "#f9f9f9",
  },
};

// Evidence box style based on category and presence
export const getEvidenceBoxStyle = (category, isPresent, isEditing = false) => {
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
    transform: isPresent ? "scale(1.05)" : "none",
    transition: "transform 0.2s",
    cursor: isEditing ? "pointer" : "default",
    "&:hover": isEditing
      ? {
          opacity: 0.85,
          transform: "scale(1.15)",
        }
      : {},
  };
};

// Get classification-specific styles
export const getClassificationStyles = (classification) => {
  // Background, border and text color based on classification
  switch (classification) {
    case "Pathogenic":
      return {
        bg: "rgba(211, 47, 47, 0.1)",
        border: "2px solid rgba(211, 47, 47, 0.7)",
        color: "#d32f2f",
      };
    case "Likely pathogenic":
      return {
        bg: "rgba(229, 57, 53, 0.1)",
        border: "2px solid rgba(229, 57, 53, 0.7)",
        color: "#e53935",
      };
    case "Uncertain significance":
      return {
        bg: "rgba(117, 117, 117, 0.1)",
        border: "2px solid rgba(117, 117, 117, 0.7)",
        color: "#424242",
      };
    case "Likely benign":
      return {
        bg: "rgba(67, 160, 71, 0.1)",
        border: "2px solid rgba(67, 160, 71, 0.7)",
        color: "#43a047",
      };
    case "Benign":
      return {
        bg: "rgba(46, 125, 50, 0.1)",
        border: "2px solid rgba(46, 125, 50, 0.7)",
        color: "#2e7d32",
      };
    default:
      return {
        bg: "rgba(117, 117, 117, 0.1)",
        border: "2px solid rgba(117, 117, 117, 0.7)",
        color: "#424242",
      };
  }
};
