import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";
import PageviewIcon from "@mui/icons-material/Pageview";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { Complete, Failed, InProgress, Parsing, Pending } from "./StatusIcons";
import getProjects from "../../apis/getProjects";
import postReRun from "../../apis/postReRun";
import postDeleteProject from "../../apis/postDeleteProject";

function ProjectList(props) {
  const [projects, setProjects] = React.useState([]);
  const [counter, setCounter] = React.useState(0); // Used to force render the component
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const columns = [
    { field: "name", headerName: "Project Name", flex: 1 },
    { field: "project_type", headerName: "Type", flex: 0.3 },
    { field: "created_at", headerName: "Time", flex: 0.4 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
      align: "center",
      renderCell: (params) => {
        switch (params.value.toLowerCase()) {
          case "completed":
            return <Complete />;
          case "running":
            return <InProgress />;
          case "parsing":
            return <Parsing />;
          case "pending":
            return <Pending />;
          case "failed":
            return <Failed />;
          default:
            return params.value;
        }
      },
    },
    { field: "collaborators", headerName: "Collaborators", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      align: "center",
      renderCell: (params) => (
        <Box>
          <Tooltip title="View Results">
            <IconButton
              aria-label="view_results"
              onClick={() => handleOnViewResultsClick(params)}
              disabled={loading}
            >
              <PageviewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Re-run">
            <IconButton
              aria-label="rerun"
              onClick={() => handleRerun(params.row.id)}
              disabled={loading}
            >
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(params.row.id)}
              disabled={loading}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleOnViewResultsClick = (params) => {
    if (params.row.status.toLowerCase() === "completed") {
      const rowId = params.row.id;
      navigate(`./${rowId}`);
    }
  };

  const handleRerun = async (id) => {
    setLoading(true);
    try {
      await postReRun(id);
      // Increment counter to trigger re-fetch
      setCounter((prevCounter) => prevCounter + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setLoading(true);
    try {
      await postDeleteProject(id);
      // Increment counter to trigger re-fetch
      setCounter((prevCounter) => prevCounter + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects when component mounts or counter changes
  React.useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await getProjects();
        const data = res.data.map((item) => ({
          ...item,
          collaborators: item.collaborators.join(","),
          created_at: new Date(item.created_at).toLocaleString("en-US"),
        }));
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [counter]); // Add counter as dependency to re-fetch when it changes

  // Custom "no rows" overlay
  const NoRowsOverlay = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        No projects found
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Create a new project to get started
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ height: { xs: "200px", md: "500px" }, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
        <Box sx={{ width: 100 }}>
          <Typography variant="h5">Projects</Typography>
        </Box>
        <Button
          component={Link}
          to="/portal"
          variant="text"
          size="small"
          startIcon={<AddIcon />}
          color="button"
          disabled={loading}
        >
          Create New Project
        </Button>
      </Box>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            components={{
              NoRowsOverlay: NoRowsOverlay,
              LoadingOverlay: CircularProgress,
            }}
            loading={loading}
            columns={columns}
            rows={projects}
            hideFooter
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#0f0f4d",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
export default ProjectList;
