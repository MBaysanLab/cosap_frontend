import "filepond/dist/filepond.min.css";
import * as React from "react";
import { FilePond } from "react-filepond";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { API_URL } from "../../config";
import storage from "../../utils/storage";
import MultipleSelectChip from "../../Components/MultipleSelectChip";

function FileSelectUpload(props) {
  const token = storage.getToken();
  return (
    <Paper sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography color={"#1164a7"} sx={{ pb: 2 }} align="center">
          {props.title}
        </Typography>
        {props.tooltip}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          mt: 2,
        }}
      >
        <Typography fontSize={13} align="center">
          Select from Previously Uploaded Files
        </Typography>
        <MultipleSelectChip
          title="Select Files"
          fileSetter={props.fileSetter}
          fileNames={props.previousFiles}
        />
      </Box>
      <Box sx={{ mb: 2, mt: 2 }} align="center">
        <Typography fontSize={13}>
          Or Upload New Files from Your Computer
        </Typography>
      </Box>
      <FilePond
        name="file"
        ref={(ref) => props.refSetter(ref)}
        credits={false}
        allowMultiple={props.allowMultiple}
        instantUpload={false}
        allowProcess={false}
        onprocessfile={props.handleProcessFiles}
        onprocessfilestart={props.handleStartFileUpload}
        chunkUploads={true}
        oninitfile={props.onAddfile}
        onremovefile={props.onRemoveFile}
        maxFiles={props.maxFiles ? props.maxFiles : 100}
        server={{
          url: `${API_URL}files`,
          process: {
            method: "POST",
            headers: {
              authorization: `Token ${token}`,
            },
            withCredentials: true,
            ondata: (formData) => {
              formData.append("sample_type", props.sampleType);
              formData.append("fp_upload_field", "file");
              return formData;
            },
          },
          patch: {
            url: "/patch/",
            method: "PATCH",
            headers: {
              authorization: `Token ${token}`,
            },
            withCredentials: true,
          },
          load: "/load/",
        }}
      />
    </Paper>
  );
}
export default FileSelectUpload;
