import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";

import ServicesWidget from "./ServicesWidget";
import ActionsWidget from "./ActionsWidget";

function Dashboard() {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "auto",
        paddingBottom: 2,
      }}
    >
      <Grid item xs={12} md={5}>
        <Card raised sx={{ p: { xs: 1, md: 3 } }}>
          <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
            <Typography variant="h5">Workflows</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Box>
            <ServicesWidget />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={7}>
        <Card raised sx={{ p: { xs: 1, md: 3 } }}>
          <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
            <Typography variant="h5">Activity</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Box>
            <ActionsWidget />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
export default Dashboard;
