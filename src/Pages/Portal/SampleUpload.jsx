import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import postSample from "../../apis/postSample";

const FileSelectUpload = React.lazy(() => import("./FileUploader"));

function SampleUpload() {
  const [fileUploader, setFileUploader] = React.useState(null);
  const [sampleName, setSampleName] = React.useState("");
  const [sampleType, setSampleType] = React.useState("NORMAL");
  const [nameError, setNameError] = React.useState(false);
  const [fileError, setFileError] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadComplete, setUploadComplete] = React.useState(false);

  const navigate = useNavigate();

  const handleSampleNameChange = (event) => {
    setSampleName(event.target.value);
    setNameError(false);
  };

  const handleSampleTypeChange = (event) => {
    setSampleType(event.target.value);
  };

  const handleAddFile = () => {
    setFileError(false);
  };

  const handleRemoveFile = () => {
    // Reset file error if no file is present
  };

  const handleUploadSample = async () => {
    // Validate inputs
    if (!sampleName.trim()) {
      setNameError(true);
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("name", sampleName);
    formData.append("sample_type", sampleType);

    setIsUploading(true);

    try {
      if (fileUploader) {
        const files = await fileUploader.processFiles();
        if (files && files.length > 0) {
          formData.append(
            "files",
            JSON.stringify(files.map((file) => file.serverId))
          );

          // Call API to save sample
          const response = await postSample(formData);

          if (response.status === 201) {
            setUploadComplete(true);
            setTimeout(() => {
              navigate("/portal/samples");
            }, 2000);
          }
        } else {
          setFileError(true);
          setIsUploading(false);
        }
      } else {
        setFileError(true);
        setIsUploading(false);
      }
    } catch (error) {
      console.error("Error uploading sample:", error);
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", mx: "auto", p: 2 }}>
      <Typography variant="h5" color="secondary" gutterBottom>
        Upload Sample
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 2, borderRadius: 2 }}>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Sample Name"
            variant="outlined"
            value={sampleName}
            onChange={handleSampleNameChange}
            error={nameError}
            helperText={nameError ? "Sample name is required" : ""}
            sx={{ mb: 2 }}
          />

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Sample Type
            </Typography>
            <RadioGroup
              row
              name="sampleType"
              value={sampleType}
              onChange={handleSampleTypeChange}
            >
              <FormControlLabel
                value="NORMAL"
                control={<Radio />}
                label="Normal"
              />
              <FormControlLabel
                value="TUMOR"
                control={<Radio />}
                label="Tumor"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Sample File
        </Typography>

        <React.Suspense fallback={<Box>Loading file uploader...</Box>}>
          <FileSelectUpload
            refSetter={setFileUploader}
            title="Upload Sample File"
            allowMultiple={false}
            sampleType={sampleType}
            onAddfile={handleAddFile}
            onRemoveFile={handleRemoveFile}
            maxFiles={1}
          />
        </React.Suspense>

        {fileError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Please select or upload a file
          </Alert>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/portal/samples")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadSample}
            disabled={isUploading}
            sx={{ backgroundColor: "#428AAE" }}
          >
            {isUploading ? "Uploading..." : "Upload Sample"}
          </Button>
        </Box>

        {uploadComplete && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Sample uploaded successfully! Redirecting to samples list...
          </Alert>
        )}
      </Paper>
    </Box>
  );
}

export default SampleUpload;
