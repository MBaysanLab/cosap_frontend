import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import FileUpload from "./FileUpload";

function CreateProject() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <Typography variant="h6" color="#1164a7">
          Craete New Project
        </Typography>
      </Box>
      <Box sx={{ width: "10vw" }}>
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
          suppying normal samples increases sensitivity and specificy
          drammatically.
        </Alert>
      </Box>
      <FileUpload />
    </Box>
  );
}
export default CreateProject;
