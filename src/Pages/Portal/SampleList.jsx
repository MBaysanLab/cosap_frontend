import * as React from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import getSamples from "../../apis/getSamples";

function SampleList() {
  const [samples, setSamples] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchSamples = async () => {
      try {
        const response = await getSamples();
        setSamples(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching samples:", error);
        setLoading(false);
      }
    };

    fetchSamples();
  }, []);

  const handleViewSample = (sampleId) => {
    navigate(`/portal/samples/${sampleId}`);
  };

  const handleDeleteSample = (sampleId) => {
    // Implement delete functionality
    console.log("Delete sample:", sampleId);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" color="secondary">
          Sample Repository
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/portal/samples/upload")}
          sx={{ backgroundColor: "#428AAE" }}
        >
          Upload New Sample
        </Button>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Sample Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Upload Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">File Size</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Projects</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight="bold">Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading samples...
                  </TableCell>
                </TableRow>
              ) : samples.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No samples found. Upload a sample to get started.
                  </TableCell>
                </TableRow>
              ) : (
                samples.map((sample) => (
                  <TableRow key={sample.id}>
                    <TableCell>{sample.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={sample.sample_type}
                        color={
                          sample.sample_type === "TUMOR" ? "error" : "success"
                        }
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(sample.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {(sample.file_size / (1024 * 1024)).toFixed(2)} MB
                    </TableCell>
                    <TableCell>
                      {sample.projects?.length > 0
                        ? sample.projects.map((project) => (
                            <Chip
                              key={project.id}
                              label={project.name}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))
                        : "Not used in any project"}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Sample Details">
                        <IconButton onClick={() => handleViewSample(sample.id)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Sample">
                        <IconButton
                          onClick={() => handleDeleteSample(sample.id)}
                          disabled={sample.projects?.length > 0}
                        >
                          <DeleteIcon
                            fontSize="small"
                            color={
                              sample.projects?.length > 0 ? "disabled" : "error"
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default SampleList;
