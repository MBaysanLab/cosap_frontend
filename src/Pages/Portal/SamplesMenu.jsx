import * as React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Outlet, useNavigate } from "react-router-dom";

function SamplesMenu() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h5" color="secondary">
                Sample Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Organize and manage your genomic samples for analysis
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/portal/samples/upload")}
              sx={{ backgroundColor: "#428AAE" }}
            >
              Upload New Sample
            </Button>
          </Box>
        </Paper>
      </Box>

      <Outlet />
    </Box>
  );
}

export default SamplesMenu;
