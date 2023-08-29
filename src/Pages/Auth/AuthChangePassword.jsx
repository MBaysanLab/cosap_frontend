import * as React from "react";
import { Box, Card, CardContent, Grid } from "@mui/material";
import ChangePasswordForm from "./ChangePasswordForm";

function ChangePassword() {
  return (
    <Box display="flex" justifyContent="start" flexDirection="column">
      <Box display="flex" justifyContent="center" flexDirection="column">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          sx={{
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
                  <ChangePasswordForm />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
export default ChangePassword;
