import { useState, useEffect } from 'react';
import { 
  parseInterVarEvidence, 
  buildInterVarEvidenceString, 
  classifyACMG 
} from '../utils/variant';

/**
 * Custom hook to manage variant evidence editing
 * @param {object} variant - The variant data
 * @param {function} onUpdate - Callback function when variant is updated
 * @return {object} - Hook state and methods
 */
const useVariantEvidence = (variant, onUpdate) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvidence, setEditedEvidence] = useState(null);
  const [manualClassification, setManualClassification] = useState(null);

  useEffect(() => {
    // Reset states when variant changes
    setEditedEvidence(null);
    setIsEditing(false);
    setManualClassification(null);
  }, [variant]);

  const handleEdit = () => {
    // Initialize edited evidence based on current evidence
    const currentEvidence = parseInterVarEvidence(variant.evidence_intervar);
    setEditedEvidence(currentEvidence ? { ...currentEvidence } : {});
    // Set manual classification to current classification as starting point
    setManualClassification(variant.intervar_classification);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!variant) return;
    
    // Build new evidence string from editedEvidence
    const newEvidenceString = buildInterVarEvidenceString(editedEvidence);

    const previousClassification = variant.intervar_classification;
    // Use manual classification if provided, otherwise use ACMG rules
    const newClassification = manualClassification || classifyACMG(editedEvidence);

    // Update variant with new evidence and classification
    const updatedVariant = {
      ...variant,
      evidence_intervar: newEvidenceString,
      intervar_classification: newClassification,
      // Add a flag to indicate classification method
      classification_method: manualClassification ? "manual" : "automated",
    };

    // If callback provided, send the updated variant
    if (onUpdate) {
      onUpdate(updatedVariant, {
        previousClassification,
        newClassification,
        isManualClassification: !!manualClassification
      });
    }

    setIsEditing(false);
    setManualClassification(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedEvidence(null);
    setManualClassification(null);
  };

  const toggleCriterion = (criterion) => {
    if (!isEditing) return;

    setEditedEvidence(prev => {
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

  const handleClassificationChange = (classification) => {
    setManualClassification(classification);
  };

  return {
    isEditing,
    editedEvidence,
    manualClassification,
    handleEdit,
    handleSave,
    handleCancel,
    toggleCriterion,
    handleClassificationChange
  };
};

export default useVariantEvidence;
