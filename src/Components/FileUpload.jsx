import "filepond/dist/filepond.min.css";
import * as React from "react";
import { File, FilePond, registerPlugin } from "react-filepond";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { typographyVariant } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    text: {
      secondary: "#1164a7",
    },
  },
});

function FileUpload() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Box sx={{ width: "20vw", mt: 1, mb: 3 }}>
          <Typography color={"text.secondary"} sx={{ pb: 2 }}>
            Normal Samples
          </Typography>
          <FilePond credits={false} />
        </Box>
        <Box sx={{ width: "20vw", mt: 1, mb: 3, ml: { xs: 0, md: 3 } }}>
          <Typography color={"text.secondary"} sx={{ pb: 2 }}>
            Tumor Samples
          </Typography>
          <FilePond credits={false} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default FileUpload;
