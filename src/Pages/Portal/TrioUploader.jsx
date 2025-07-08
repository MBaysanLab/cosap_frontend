import * as React from "react";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const FileUploader = React.lazy(() => import("./FileUploader.jsx"));

function TrioUploader({
  onAddFile,
  onRemoveFile,
  fatherFileUploader,
  motherFileUploader,
  childFileUploader,
  setSelectedFatherFiles,
  setSelectedMotherFiles,
  setSelectedChildFiles,
  previousFatherFiles = {},
  previousMotherFiles = {},
  previousChildFiles = {},
  probandRefs,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [probands, setProbands] = React.useState([
    { id: 0, ref: childFileUploader, files: previousChildFiles },
  ]);

  // Function to add a new proband uploader
  const addProband = () => {
    const newProbandId = probands.length;
    // Only add if we don't already have an additional proband
    if (probands.length < 2) {
      setProbands([
        ...probands,
        {
          id: newProbandId,
          files: {},
        },
      ]);
    }
  };

  // Function to remove a proband uploader
  const removeProband = (id) => {
    // Can't remove the first/main proband
    if (id === 0) return;

    // Remove from probands state
    setProbands(probands.filter((p) => p.id !== id));

    // Remove from refs array
    if (probandRefs?.current) {
      probandRefs.current[id] = null;
    }
  };

  // Handle file add for specific proband
  const handleAddFile = (file, probandId = 0) => {
    if (probandId === 0) {
      // For the first proband, use the provided setter
      onAddFile(file);
    } else {
      // For additional probands, include the probandId
      onAddFile({ ...file, probandId });

      // Update the files state for this proband
      setProbands((prevProbands) =>
        prevProbands.map((p) =>
          p.id === probandId
            ? { ...p, files: { ...p.files, [file.id]: file } }
            : p
        )
      );
    }
  };

  // Handle file remove for specific proband
  const handleRemoveFile = (fileId, probandId = 0) => {
    if (probandId === 0) {
      // For the first proband, use the provided handler
      onRemoveFile(fileId);
    } else {
      // For additional probands
      onRemoveFile(fileId, probandId);

      // Update the files state for this proband
      setProbands((prevProbands) =>
        prevProbands.map((p) => {
          if (p.id === probandId) {
            const updatedFiles = { ...p.files };
            delete updatedFiles[fileId];
            return { ...p, files: updatedFiles };
          }
          return p;
        })
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: 4,
        mb: 4,
        position: "relative",
      }}
    >
      {/* Probands section - horizontal layout on large screens */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          gap: 4,
          mb: 4,
          position: "relative",
        }}
      >
        {probands.map((proband, index) => (
          <Box
            key={proband.id}
            sx={{
              width: isMobile ? "100%" : "30%",
              position: "relative",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                borderTop: "5px solid #9c27b0",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ChildCareIcon
                    sx={{ color: "#9c27b0", mr: 1, fontSize: 28 }}
                  />
                  <Typography variant="h6" color="secondary">
                    Proband {probands.length > 1 ? `#${index + 1}` : ""} (Child)
                  </Typography>
                </Box>

                {/* Add remove button for additional probands */}
                {proband.id > 0 && (
                  <Tooltip title="Remove this proband">
                    <IconButton
                      onClick={() => removeProband(proband.id)}
                      size="small"
                      sx={{
                        color: "error.main",
                        "&:hover": {
                          backgroundColor: "rgba(211, 47, 47, 0.04)",
                        },
                      }}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              <Divider sx={{ mb: 2 }} />
              <React.Suspense fallback={<div>Loading...</div>}>
                <FileUploader
                  refSetter={
                    index === 0
                      ? childFileUploader
                      : (ref) => {
                          // Store ref in our refs array for additional probands
                          if (ref) {
                            probandRefs.current[proband.id] = ref;
                            probandRefs.current = [...probandRefs.current];
                          }
                        }
                  }
                  allowMultiple={false}
                  sampleType="NORMAL"
                  onAddfile={(file) => handleAddFile(file, proband.id)}
                  onRemoveFile={(fileId) =>
                    handleRemoveFile(fileId, proband.id)
                  }
                  maxFiles={2}
                  fileSetter={index === 0 ? setSelectedChildFiles : null}
                  previousFiles={
                    index === 0 ? previousChildFiles : proband.files
                  }
                />
              </React.Suspense>
            </Paper>
          </Box>
        ))}

        {/* Add button - only show when we have fewer than 2 probands total */}
        {probands.length < 2 && (
          <Tooltip title="Add another proband">
            <IconButton
              onClick={addProband}
              sx={{
                position: isMobile ? "absolute" : "static",
                right: isMobile ? 0 : "auto",
                top: isMobile ? "50%" : "auto",
                transform: isMobile ? "translateY(-50%)" : "none",
                color: "#9c27b0",
                backgroundColor: "white",
                boxShadow: 2,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                width: 40,
                height: 40,
                alignSelf: isMobile ? "auto" : "center",
                margin: isMobile ? 0 : "auto 0",
              }}
              size="large"
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Parents row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {/* Father uploader */}
        <Box sx={{ width: isMobile ? "100%" : "30%" }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              borderTop: "5px solid #428AAE",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <MaleIcon sx={{ color: "#428AAE", mr: 1, fontSize: 28 }} />
              <Typography variant="h6" color="secondary">
                Father
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <React.Suspense fallback={<div>Loading...</div>}>
              <FileUploader
                refSetter={fatherFileUploader}
                allowMultiple={false}
                sampleType="NORMAL"
                onAddfile={onAddFile}
                onRemoveFile={onRemoveFile}
                maxFiles={2}
                fileSetter={setSelectedFatherFiles}
                previousFiles={previousFatherFiles}
              />
            </React.Suspense>
          </Paper>
        </Box>

        {/* Mother uploader */}
        <Box sx={{ width: isMobile ? "100%" : "30%" }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              borderTop: "5px solid #FF69B4",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <FemaleIcon sx={{ color: "#FF69B4", mr: 1, fontSize: 28 }} />
              <Typography variant="h6" color="secondary">
                Mother
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <React.Suspense fallback={<div>Loading...</div>}>
              <FileUploader
                refSetter={motherFileUploader}
                allowMultiple={false}
                sampleType="NORMAL"
                onAddfile={onAddFile}
                onRemoveFile={onRemoveFile}
                maxFiles={2}
                fileSetter={setSelectedMotherFiles}
                previousFiles={previousMotherFiles}
              />
            </React.Suspense>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default TrioUploader;
