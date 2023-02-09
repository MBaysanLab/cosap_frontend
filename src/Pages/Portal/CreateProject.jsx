/* eslint-disable max-len */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate, useSearchParams } from "react-router-dom";

import FileUpload from "./FileUpload.jsx";
import AlgorithmSelector from "./AlgorithmSelector";
import postProject from "../../apis/postProject.js";

const mappers = ["BWA2", "BWA", "Bowtie2"];
const variantCallers = [
  "Mutect2",
  "Varscan2",
  "Strelka",
  "MuSe",
  "Octopus",
  "SomaticSniper",
  "VarDict",
  "HapotypeCaller",
];
const variantAnnotators = [
  "Ensembl-VEP",
  "Annovar",
  "PharmGKB",
  "InterVAR",
  "CancerVAR",
];

const algorithmKeys = ["aligner", "variantCaller", "variantAnnotator"];

function CreateProject(props) {
  const [tumorFileUploader, setTumorFileUploader] = React.useState(null);
  const [normalFileUploader, setNormalFileUploader] = React.useState(null);
  const [bedFileUploader, setBedFileUploader] = React.useState(null);
  const [searchParams] = useSearchParams();
  const [projectId, setProjectId] = React.useState();
  const [fileUploadStatus, setfileUploadStatus] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(fileUploadStatus);
    if (fileUploadStatus === 0) {
      navigate("../");
    }
  }, [fileUploadStatus]);

  // Set predifened values for algorithms
  const [inputs, setInputs] = React.useState({
    project_type: searchParams.get("type"),
    aligner: ["BWA2"],
    variantCaller: ["Mutect2"],
    variantAnnotator: ["Ensembl-VEP"],
  });

  const handleInput = (name, value) => {
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateProject = () => {
    const formData = new FormData();
    const algorithmDict = {};
    for (const key in inputs) {
      if (Object.prototype.hasOwnProperty.call(inputs, key)) {
        if (algorithmKeys.includes(key)) {
          algorithmDict[`${key}`] = inputs[key];
        } else {
          formData.append(key, inputs[key]);
        }
      }
    }
    formData.append("algorithms", JSON.stringify(algorithmDict));
    postProject(formData).then((response) => {
      // If project is created successfully, start the file upload.
      if (response.status == "201") {
        setProjectId(response.data.id);
        tumorFileUploader.processFiles();
        normalFileUploader.processFiles();
        bedFileUploader.processFiles();
      }
    });
  };

  const handleStartFileUpload = () => {
    if (fileUploadStatus === null) {
      setfileUploadStatus(-1);
    } else {
      setfileUploadStatus(fileUploadStatus - 1);
    }
  };

  const handleFileUploadComplete = () => {
    setfileUploadStatus(fileUploadStatus + 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography variant="h5" color="secondary">
          New Project
        </Typography>
      </Box>
      <Box sx={{ width: { sm: "100vw", md: "25vw" } }}>
        <TextField
          name="name"
          label="Project Name"
          variant="standard"
          required={true}
          onChange={(e) => {
            handleInput(e.target.name, e.target.value);
          }}
          sx={{
            "& label.Mui-focused": {
              color: "black",
            },
          }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" color="secondary">
          Upload Sample Files
        </Typography>
        <Alert severity="info">
          Somatic variant calling can be made with tumor samples alone. However,
          suppying normal samples increases sensitivity and specificity
          dramatically.
        </Alert>
      </Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ width: { sm: "100%", md: "20vw" }, mt: 1, mb: 2 }}>
          <FileUpload
            refSetter={setNormalFileUploader}
            title="Normal Samples"
            allowMultiple={true}
            projectId={projectId}
            sampleType="NM"
            handleProcessFiles={handleFileUploadComplete}
            handleStartFileUpload={handleStartFileUpload}
          />
        </Box>
        <Box
          sx={{
            width: { sm: "100%", md: "20vw" },
            mt: 1,
            mb: 2,
            ml: { xs: 0, md: 3 },
          }}
        >
          <FileUpload
            refSetter={setTumorFileUploader}
            title="Tumor Samples"
            allowMultiple={true}
            projectId={projectId}
            sampleType="TM"
            handleProcessFiles={handleFileUploadComplete}
            handleStartFileUpload={handleStartFileUpload}
          />
        </Box>
        <Box
          sx={{
            width: { sm: "100%", md: "20vw" },
            mt: 1,
            mb: 2,
            ml: { xs: 0, md: 3 },
          }}
        >
          <FileUpload
            refSetter={setBedFileUploader}
            title="BED File"
            allowMultiple={true}
            projectId={projectId}
            handleProcessFiles={handleFileUploadComplete}
            handleStartFileUpload={handleStartFileUpload}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" color="secondary">
          Select Workflow Algorithms
        </Typography>
        <Alert severity="info">
          If you want to continue with default workflow, you can skip this part.
        </Alert>
      </Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ width: { sm: "100%", md: "20vw" }, mt: 1, mb: 3 }}>
          <AlgorithmSelector
            title="Aligner"
            name="aligner"
            options={mappers}
            type="Aligner"
            onChange={handleInput}
          />
        </Box>
        <Box
          sx={{
            width: { sm: "100%", md: "20vw" },
            mt: 1,
            mb: 3,
            ml: { xs: 0, md: 3 },
          }}
        >
          <AlgorithmSelector
            title="Variant Caller"
            name="variantCaller"
            options={variantCallers}
            type="Variant Detector"
            onChange={handleInput}
          />
        </Box>
        <Box
          sx={{
            width: { sm: "100%", md: "20vw" },
            mt: 1,
            mb: 3,
            ml: { xs: 0, md: 3 },
          }}
        >
          <AlgorithmSelector
            title="Variant Annotator"
            name="variantAnnotator"
            options={variantAnnotators}
            type="Variant Annotator"
            onChange={handleInput}
          />
        </Box>
      </Box>
      <Box width={"100px"}>
        <Button
          variant="contained"
          onClick={handleCreateProject}
          sx={{ backgroundColor: "#428A9C", color: "#fff" }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}
export default CreateProject;
