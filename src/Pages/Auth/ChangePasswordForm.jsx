import * as React from "react";
import { Box, Card, CardContent, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthChangePassword from "./AuthChangePassword";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ffffff",
      dark: "#7896a6",
    },
    secondary: {
      main: "#DE1E3D",
    },
    action: {
      active: "#001E3C",
    },
    button: {
      main: "#428A9C",
    },
    success: {
      main: "#5be5a5",
    },
    progress: {
      main: "#68d4e8",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

function ChangePassword() {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="start" flexDirection="column">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            sx={{
              height: "43vh",
              mt: { xs: 0, md: 2 },
            }}
          >
            <Card
              variant="outlined"
              sx={{
                maxHeight: { xs: "100vh", md: "60vh" },
                maxWidth: { xs: "100vw", md: "40vw" },
              }}
            >
              <CardContent sx={{ m: { xs: 1, sm: 3 }, mb: 30 }}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={12}>
                    <AuthChangePassword />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default ChangePassword;
