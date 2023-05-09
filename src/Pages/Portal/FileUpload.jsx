import "filepond/dist/filepond.min.css";
import * as React from "react";
import { FilePond } from "react-filepond";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { API_URL } from "../../config";
import storage from "../../utils/storage";
// import { postFile, postFileController, uploadProgressEvent } from "../../apis";

function FileUpload(props) {
  const token = storage.getToken();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography color={"#1164a7"} sx={{ pb: 2, pr: 1 }}>
          {props.title}
        </Typography>
        {props.tooltip}
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
    </Box>
  );
}
export default FileUpload;
