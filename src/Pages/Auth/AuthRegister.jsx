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
import RegisterForm from "./RegisterForm";
import { ReactComponent as BannerSVG } from "../../assets/images/banner.svg";

function Register() {
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
              height: { xs: "calc(100vh - 130px)", md: "calc(95vh - 130px)" },
              mt: { xs: 0, md: "5vh" },
            }}
          >
            <Box sx={{ display: "inline-block" }}>
              <Card
                variant="outlined"
                sx={{
                  maxWidth: { xs: "100vw", md: "40vw" },
                }}
              >
                <CardContent sx={{ m: { xs: 1, sm: 2 } }}>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item sx={{ mb: 1 }}>
                      <Box sx={{ width: "30px", height: "30px" }}>
                        <BannerSVG />
                      </Box>
                    </Grid>
                    <Grid item sx={{ mb: 1 }}>
                      <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { md: "flex" } }}
                      >
                        Register
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <RegisterForm />
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
                          to="/login"
                          color="black"
                          sx={{
                            fontSize: 13,
                            textDecoration: "none",
                          }}
                        >
                          Go to Login
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
export default Register;
