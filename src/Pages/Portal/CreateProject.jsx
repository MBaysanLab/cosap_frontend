/* eslint-disable max-len */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate, useSearchParams } from "react-router-dom";
const FileSelectUpload = React.lazy(() => import("./FileSelectUpload.jsx"));
const TrioUploader = React.lazy(() => import("./TrioUploader.jsx"));
import AlgorithmSelector from "./AlgorithmSelector";
import postProject from "../../apis/postProject.js";
import getFiles from "../../apis/getFiles";

// Predifened values for algorithms
const mappers = ["BWA2", "BWA", "Bowtie2"];
const variantCallers = [
  "Mutect",
  "Varscan2",
  "Strelka",
  "MuSe",
  "Octopus",
  "SomaticSniper",
  "VarDict",
  "HapotypeCaller",
];
const variantAnnotators = [
  "VEP",
  "Annovar",
  "PharmGKB",
  "InterVAR",
  "CancerVAR",
];

// Predifened values for algorithm keys
const algorithmKeys = ["aligner", "variantCaller", "variantAnnotator"];

function CreateProject(props) {
  const [tumorFileUploader, setTumorFileUploader] = React.useState(null);
  const [normalFileUploader, setNormalFileUploader] = React.useState(null);
  const [bedFileUploader, setBedFileUploader] = React.useState(null);
  const [fatherFileUploader, setFatherFileUploader] = React.useState(null);
  const [motherFileUploader, setMotherFileUploader] = React.useState(null);
  const [childFileUploader, setChildFileUploader] = React.useState(null);
  const [searchParams] = useSearchParams();
  const [numberOfAddedFiles, setNumberOfAddedFiles] = React.useState(0);
  const [FileUploadAlert, setFileUploadAlert] = React.useState(false);
  const [projectNameAlert, setProjectNameAlert] = React.useState(false);

  // Standard file states
  const [selectedNormalFiles, setSelectedNormalFiles] = React.useState([]);
  const [selectedTumorFiles, setSelectedTumorFiles] = React.useState([]);
  const [selectedBedFiles, setSelectedBedFiles] = React.useState([]);

  // Trio file states
  const [selectedFatherFiles, setSelectedFatherFiles] = React.useState([]);
  const [selectedMotherFiles, setSelectedMotherFiles] = React.useState([]);
  const [selectedChildFiles, setSelectedChildFiles] = React.useState([]);

  // States that stores previously uploaded files
  const [previousNormalFiles, setPreviousNormalFiles] = React.useState({});
  const [previousTumorFiles, setPreviousTumorFiles] = React.useState({});
  const [previousBedFiles, setPreviousBedFiles] = React.useState({});

  const navigate = useNavigate();

  const projectType = searchParams.get("type");

  // Get previously uploaded files
  React.useEffect(() => {
    getFiles("sample_type", "normal")
      .then((response) => {
        setPreviousNormalFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getFiles("sample_type", "tumor")
      .then((response) => {
        setPreviousTumorFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getFiles("file_type", "bed")
      .then((response) => {
        setPreviousBedFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Set predifened values for algorithms
  const [inputs, setInputs] = React.useState({
    project_type: projectType,
    aligner: ["BWA2"],
    variantCaller: ["Mutect2"],
    variantAnnotator: [],
  });

  const handleInput = (name, value) => {
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setProjectNameAlert(false);
  };

  const handleCreateProject = async () => {
    if (!inputs.name) {
      setProjectNameAlert(true);
      return;
    }

    // Create form data
    const formData = new FormData();

    if (projectType === "GERMLINE_TRIO") {
      // Check if child sample is uploaded, which is required for trio analysis
      if (selectedChildFiles.length < 1 && !childFileUploader) {
        setFileUploadAlert(true);
        return;
      }

      // Process trio files
      if (selectedFatherFiles.length > 0) {
        formData.append("father_files", JSON.stringify(selectedFatherFiles));
      } else if (fatherFileUploader) {
        try {
          const fatherFiles = await fatherFileUploader.processFiles();
          formData.append(
            "father_files",
            JSON.stringify(fatherFiles.map((file) => file.serverId))
          );
        } catch (error) {
          console.error(error);
        }
      }

      if (selectedMotherFiles.length > 0) {
        formData.append("mother_files", JSON.stringify(selectedMotherFiles));
      } else if (motherFileUploader) {
        try {
          const motherFiles = await motherFileUploader.processFiles();
          formData.append(
            "mother_files",
            JSON.stringify(motherFiles.map((file) => file.serverId))
          );
        } catch (error) {
          console.error(error);
        }
      }

      if (selectedChildFiles.length > 0) {
        formData.append("child_files", JSON.stringify(selectedChildFiles));
      } else if (childFileUploader) {
        try {
          const childFiles = await childFileUploader.processFiles();
          formData.append(
            "child_files",
            JSON.stringify(childFiles.map((file) => file.serverId))
          );
        } catch (error) {
          console.error(error);
          return; // Stop if child files couldn't be processed since they're required
        }
      } else {
        setFileUploadAlert(true);
        return;
      }
    } else {
      // Regular project file logic
      // Check if any files are added
      if (numberOfAddedFiles < 1) {
        if (selectedNormalFiles.length < 1 && selectedTumorFiles.length < 1) {
          setFileUploadAlert(true);
          return;
        }
      }

      // Standard project files handling
      if (selectedTumorFiles.length > 0) {
        formData.append("tumor_files", JSON.stringify(selectedTumorFiles));
      } else if (projectType !== "GM" && tumorFileUploader) {
        try {
          const tumorFiles = await tumorFileUploader.processFiles();
          formData.append(
            "tumor_files",
            JSON.stringify(tumorFiles.map((file) => file.serverId))
          );
        } catch (error) {
          console.error(error);
        }
      }

      if (selectedNormalFiles.length > 0) {
        formData.append("normal_files", JSON.stringify(selectedNormalFiles));
      } else if (normalFileUploader) {
        try {
          const normalFiles = await normalFileUploader.processFiles();
          formData.append(
            "normal_files",
            JSON.stringify(normalFiles.map((file) => file.serverId))
          );
        } catch (error) {
          console.error(error);
          return;
        }
      }
    }

    // Bed files are needed for all project types
    if (selectedBedFiles.length > 0) {
      formData.append("bed_files", JSON.stringify(selectedBedFiles));
    } else if (bedFileUploader) {
      try {
        const bedFiles = await bedFileUploader.processFiles();
        formData.append(
          "bed_files",
          JSON.stringify(bedFiles.map((file) => file.serverId))
        );
      } catch (error) {
        console.error(error);
      }
    }

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

    // Post project to backend and redirect to project page
    postProject(formData)
      .then((response) => {
        if (response.status == "201") {
          navigate("../");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddFile = () => {
    setFileUploadAlert(false);
    setNumberOfAddedFiles(numberOfAddedFiles + 1);
  };
  const handleRemoveFile = () => {
    setNumberOfAddedFiles(numberOfAddedFiles - 1);
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
          error={projectNameAlert}
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
          {projectType === "GERMLINE_TRIO"
            ? "Family Samples"
            : "Upload Sample Files"}
        </Typography>

        {projectType === "GERMLINE_TRIO" && (
          <Alert severity="info" sx={{ mt: 1 }}>
            Upload or select samples for the family trio. Child sample is
            required for analysis; parent samples are optional but recommended
            for better variant interpretation.
          </Alert>
        )}

        {projectType !== "GM" && projectType !== "GERMLINE_TRIO" ? (
          <Alert severity="info">
            Somatic variant calling can be made with tumor samples alone.
            However, suppying normal samples increases sensitivity and
            specificity.
          </Alert>
        ) : null}

        {FileUploadAlert ? (
          <Alert severity="error" sx={{ mt: 3 }}>
            {projectType === "GERMLINE_TRIO"
              ? "Please upload or select a child sample for the trio analysis."
              : "Please upload or select at least one sample."}
          </Alert>
        ) : null}
      </Box>

      {projectType === "GERMLINE_TRIO" ? (
        <React.Suspense fallback={<div>Loading...</div>}>
          <TrioUploader
            onAddFile={handleAddFile}
            onRemoveFile={handleRemoveFile}
            fatherFileUploader={setFatherFileUploader}
            motherFileUploader={setMotherFileUploader}
            childFileUploader={setChildFileUploader}
            setSelectedFatherFiles={setSelectedFatherFiles}
            setSelectedMotherFiles={setSelectedMotherFiles}
            setSelectedChildFiles={setSelectedChildFiles}
            previousFatherFiles={previousNormalFiles}
            previousMotherFiles={previousNormalFiles}
            previousChildFiles={previousNormalFiles}
          />
        </React.Suspense>
      ) : (
        // Standard uploaders - keeping them side by side
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <React.Suspense fallback={<div>Loading...</div>}>
            <Box sx={{ width: { sm: "100%", md: "20vw" }, mt: 1, mb: 2 }}>
              <FileSelectUpload
                refSetter={setNormalFileUploader}
                title="Normal Samples"
                allowMultiple={true}
                sampleType="NORMAL"
                onAddfile={handleAddFile}
                onRemoveFile={handleRemoveFile}
                maxFiles={2}
                fileSetter={setSelectedNormalFiles}
                previousFiles={previousNormalFiles}
              />
            </Box>

            {(projectType === "SOMATIC" || projectType === "COMP") && (
              <Box sx={{ width: { sm: "100%", md: "20vw" }, mt: 1, mb: 2 }}>
                <FileSelectUpload
                  refSetter={setTumorFileUploader}
                  title="Tumor Samples"
                  allowMultiple={true}
                  sampleType="TUMOR"
                  onAddfile={handleAddFile}
                  onRemoveFile={handleRemoveFile}
                  fileSetter={setSelectedTumorFiles}
                  previousFiles={previousTumorFiles}
                />
              </Box>
            )}

            {/* BED file uploader alongside other uploaders */}
            <Box sx={{ width: { sm: "100%", md: "20vw" }, mt: 1, mb: 2 }}>
              <FileSelectUpload
                refSetter={setBedFileUploader}
                title="BED File"
                tooltip={
                  <Tooltip title="BED file should be the same genome build as samples.">
                    <WarningIcon sx={{ mr: 1 }} htmlColor="#BBB539" />
                  </Tooltip>
                }
                allowMultiple={false}
                onAddfile={handleAddFile}
                onRemoveFile={handleRemoveFile}
                fileSetter={setSelectedBedFiles}
                previousFiles={previousBedFiles}
                maxFiles={1}
              />
            </Box>
          </React.Suspense>
        </Box>
      )}

      {/* Algorithm selection - same for all project types that need it */}
      {projectType === "COMP" ? (
        <>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" color="secondary">
              Select Workflow Algorithms
            </Typography>
            <Alert severity="info">
              If you want to continue with default workflow, you can skip this
              part.
            </Alert>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
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
        </>
      ) : null}

      <Box width={"100px"}>
        <Button
          variant="contained"
          onClick={handleCreateProject}
          sx={{ backgroundColor: "#428AAE", color: "#fff" }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}

export default CreateProject;
