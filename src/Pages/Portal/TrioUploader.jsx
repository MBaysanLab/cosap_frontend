import * as React from "react";
import {
  Box,
  Divider,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import ChildCareIcon from "@mui/icons-material/ChildCare";

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
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "100%",
        mt: 4,
        mb: 4,
        position: "relative",
      }}
    >
      {/* Child row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Box sx={{ width: isMobile ? "100%" : "30%" }}>
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
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <ChildCareIcon sx={{ color: "#9c27b0", mr: 1, fontSize: 28 }} />
              <Typography variant="h6" color="secondary">
                Proband (Child)
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <React.Suspense fallback={<div>Loading...</div>}>
              <FileUploader
                refSetter={childFileUploader}
                allowMultiple={false}
                sampleType="NORMAL"
                onAddfile={onAddFile}
                onRemoveFile={onRemoveFile}
                maxFiles={2}
                fileSetter={setSelectedChildFiles}
                previousFiles={previousChildFiles}
              />
            </React.Suspense>
          </Paper>
        </Box>
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
              />
            </React.Suspense>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default TrioUploader;
