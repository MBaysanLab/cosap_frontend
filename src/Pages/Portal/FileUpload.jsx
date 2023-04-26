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
      <Typography color={"#1164a7"} sx={{ pb: 2 }}>
        {props.title}
      </Typography>
      <FilePond
        ref={(ref) => props.refSetter(ref)}
        credits={false}
        allowMultiple={props.allowMultiple}
        instantUpload={false}
        allowProcess={false}
        onprocessfile={props.handleProcessFiles}
        onprocessfilestart={props.handleStartFileUpload}
        chunkUploads={true}
        server={{
          url: `${API_URL}files`,
          process: {
            url: "/process/",
            method: "POST",
            headers: {
              authorization: `Token ${token}`,
            },
            withCredentials: true,
            ondata: (formData) => {
              formData.append("file_type", "FQ");
              formData.append("sample_type", props.sampleType);
              formData.append("project", props.projectId);
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
            ondata: (formData) => {
              formData.append("file_type", "FQ");
              formData.append("sample_type", props.sampleType);
              formData.append("project", props.projectId);
              return formData;
            },
          },
          load: "/load/",
        }}
        // server={{
        //   process: (
        //     fieldName,
        //     file,
        //     metadata,
        //     load,
        //     error,
        //     progress,
        //     abort
        //   ) => {
        //     // set data
        //     const formData = new FormData();
        //     formData.append("name", file.name);
        //     formData.append("file", file, file.name);
        //     formData.append("file_type", "FQ");
        //     formData.append("sample_type", props.sampleType);
        //     formData.append("project", props.projectId);

        //     postFile(formData)
        //       .then((response) => {
        //         load(response.data.id);
        //       })
        //       .catch((e) => {
        //         error();
        //       });

        //     progress(
        //       uploadProgressEvent.lengthComputable,
        //       uploadProgressEvent.loaded,
        //       uploadProgressEvent.total
        //     );

        //     // Setup abort interface
        //     return {
        //       abort: () => {
        //         postFileController.abort();
        //         abort();
        //       },
        //     };
        //   },
        // }}
      />
    </Box>
  );
}
export default FileUpload;
