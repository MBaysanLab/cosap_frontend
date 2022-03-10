import "filepond/dist/filepond.min.css";
import * as React from "react";
import { File, FilePond, registerPlugin } from "react-filepond";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { typographyVariant } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";


function FileUpload(props) {
  return (
        <Box>
          <Typography color={"#1164a7"} sx={{ pb: 2 }}>
            {props.title}
          </Typography>
          <FilePond credits={false} />
        </Box>

  );
}
export default FileUpload;
