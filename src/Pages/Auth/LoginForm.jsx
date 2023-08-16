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
import Layout from "../../Layout/Layout";
import AuthLogin from "./AuthLogin";
import { ReactComponent as BannerSVG } from "../../assets/images/banner.svg";

function Login() {
  return (
    <Layout>
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
      </Box>
    </Layout>
  );
}
export default Login;
