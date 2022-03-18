/* eslint-disable max-len */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import FileUpload from "./FileUpload.jsx";
import AlgorithmSelector from "./AlgorithmSelector";

const Mappers = ["BWA2", "BWA", "Bowtie2"];
const VariantCallers = [
  "Mutect2",
  "Varscan2",
  "Strelka",
  "MuSe",
  "Octopus",
  "SomaticSniper",
  "VarDict",
];

function CreateProject() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <Typography variant="h4">Craete New Project</Typography>
      </Box>
      <Box sx={{ width: { sm: "100vw", md: "10vw" } }}>
        <TextField
          id="standard-basic"
          label="Project Name"
          variant="standard"
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" color="#1164a7">
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
          <FileUpload title="Normal Samples" />
        </Box>
        <Box
          sx={{
            width: { sm: "100%", md: "20vw" },
            mt: 1,
            mb: 2,
            ml: { xs: 0, md: 3 },
          }}
        >
          <FileUpload title="Tumor Samples" />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" color="#1164a7">
          Select Workflow Algorithms
        </Typography>
        <Alert severity="info">
          If you want to continue with default workflow, you can skip this part.
        </Alert>
      </Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ width: { sm: "100%", md: "20vw" }, mt: 1, mb: 3 }}>
          <AlgorithmSelector title="Aligner" options={Mappers} type="Aligner" />
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
            title="Variant Detector"
            options={VariantCallers}
            type="Variant Detector"
          />
        </Box>
      </Box>
      <Button variant="contained" sx={{ backgroundColor: "#428A9C" }}>
        Create
      </Button>
    </Box>
  );
}
export default CreateProject;
