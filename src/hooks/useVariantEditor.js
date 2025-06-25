import { useState, useEffect } from "react";
import { 
  parseInterVarEvidence, 
  buildInterVarEvidenceString, 
  classifyACMG 
} from "../utils/acmg/utils";
import { toast } from "react-toastify";

/**
 * Custom hook for managing variant editing functionality
 * @param {Object} initialVariant - The initial variant data
 * @param {Function} onVariantUpdate - Callback function for when variant is updated
 * @returns {Object} - State and functions for variant editing
 */
export const useVariantEditor = (initialVariant, onVariantUpdate) => {
  const [variant, setVariant] = useState(null);
  const [isEditingIntervar, setIsEditingIntervar] = useState(false);
  const [editedEvidence, setEditedEvidence] = useState(null);
  const [manualClassification, setManualClassification] = useState(null);

  useEffect(() => {
    setVariant(initialVariant);
    // Reset edited evidence when variant changes
    setEditedEvidence(null);
    setIsEditingIntervar(false);
  }, [initialVariant]);

  const handleEditIntervar = () => {
    // Initialize edited evidence based on current evidence
    const currentEvidence = parseInterVarEvidence(variant?.evidence_intervar);
    setEditedEvidence(currentEvidence ? { ...currentEvidence } : {});
    // Set manual classification to current classification as starting point
    setManualClassification(variant?.intervar_classification);
    setIsEditingIntervar(true);
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
    if (onVariantUpdate) {
      onVariantUpdate(updatedVariant);
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

  return {
    variant,
    isEditingIntervar,
    editedEvidence,
    manualClassification,
    handleEditIntervar,
    handleSaveIntervar,
    handleCancelIntervar,
    toggleCriterion,
    setManualClassification,
    showNotification
  };
};
