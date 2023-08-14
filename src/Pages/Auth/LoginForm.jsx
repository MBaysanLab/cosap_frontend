import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthLogin from "./AuthLogin";
import Footer from "../../Components/Footer";
import { ReactComponent as BannerSVG } from "../../assets/images/banner.svg";

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

function Login() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        sx={{ minHeight: "100vh" }}
      >
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            sx={{
              height: { xs: "calc(100vh - 130px)", md: "calc(90vh - 130px)" },
              mt: { xs: 0, md: "10vh" },
            }}
          >
            <Box
              sx={{
                display: "inline-block",
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  maxWidth: { xs: "100vw", md: "40vw" },
                }}
              >
                <CardContent sx={{ m: { xs: 1, sm: 2 } }}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item sx={{ mb: 3 }}>
                      <Box sx={{ width: "30px", height: "30px" }}>
                        <BannerSVG />
                      </Box>
                    </Grid>
                    <Grid item sx={{ mb: 3 }}>
                      <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { md: "flex" } }}
                      >
                        Login
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthLogin />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        direction="column"
                        alignItems="center"
                        xs={12}
                      >
                        <Typography
                          component={Link}
                          to="/register"
                          color="black"
                          sx={{
                            fontSize: 13,
                            textDecoration: "none",
                          }}
                        >
                          Create New Account
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default Login;
