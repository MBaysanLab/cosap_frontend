import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import getSampleDetail from "../../apis/getSampleDetail";
import DownloadIcon from "@mui/icons-material/Download";
import ScienceIcon from "@mui/icons-material/Science";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SampleDetail() {
  const [sample, setSample] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchSampleDetail = async () => {
      try {
        const response = await getSampleDetail(id);
        setSample(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sample details:", error);
        setLoading(false);
      }
    };

    fetchSampleDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ width: "100%", p: 3 }}>
        <LinearProgress />
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Loading sample details...
        </Typography>
      </Box>
    );
  }

  if (!sample) {
    return (
      <Box sx={{ width: "100%", p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Sample not found
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/portal/samples")}
          sx={{ mt: 2 }}
        >
          Back to Samples
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/portal/samples")}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h5" color="secondary">
          {sample.name}
        </Typography>
        <Chip
          label={sample.sample_type}
          color={sample.sample_type === "TUMOR" ? "error" : "success"}
          size="small"
          variant="outlined"
          sx={{ ml: 2 }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sample Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Sample ID
                </Typography>
                <Typography variant="body1">{sample.id}</Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Upload Date
                </Typography>
                <Typography variant="body1">
                  {new Date(sample.created_at).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  File Size
                </Typography>
                <Typography variant="body1">
                  {(sample.file_size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  File Name
                </Typography>
                <Typography variant="body1">{sample.file_name}</Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  File Type
                </Typography>
                <Typography variant="body1">
                  {sample.file_type || "Unknown"}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={sample.processed ? "Processed" : "Pending"}
                  color={sample.processed ? "success" : "warning"}
                  size="small"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{ backgroundColor: "#428AAE" }}
              >
                Download Sample
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Projects Using Sample
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {sample.projects?.length > 0 ? (
                <List dense>
                  {sample.projects.map((project) => (
                    <ListItem
                      key={project.id}
                      button
                      onClick={() => navigate(`/portal/projects/${project.id}`)}
                    >
                      <ListItemText
                        primary={project.name}
                        secondary={`Created: ${new Date(
                          project.created_at
                        ).toLocaleDateString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    This sample is not used in any projects yet
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ScienceIcon />}
                    onClick={() => navigate("/portal/projects/create_project")}
                    sx={{ mt: 1 }}
                  >
                    Create New Project
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SampleDetail;
