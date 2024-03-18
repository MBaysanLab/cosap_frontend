import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";
import PageviewIcon from "@mui/icons-material/Pageview";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { Complete, Failed, InProgress, Pending } from "./StatusIcons";
import getProjects from "../../apis/getProjects";
import postReRun from "../../apis/postReRun";
import postDeleteProject from "../../apis/postDeleteProject";

function ProjectList(props) {
  const columns = [
    { field: "name", headerName: "Project Name", flex: 1 },
    { field: "created_at", headerName: "Time", flex: 0.4 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
      align: "center",
      renderCell: (params) => {
        switch (params.value) {
          case "completed":
            return <Complete />;
          case "in_progress":
            return <InProgress />;
          case "pending":
            return <Pending />;
          case "failed":
            return <Failed />;
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
            >
              <PageviewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Re-run">
            <IconButton
              aria-label="delete"
              onClick={() => handleRerun(params.row.id)}
            >
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleOnViewResultsClick = (params) => {
    if (params.row.status === "completed") {
      const rowId = params.row.id;
      navigate(`./${rowId}`);
    }
  };

  const handleRerun = async (id) => {
    try {
      await postReRun(id);
      setProjects(projects);
    } catch (err) {
      console.error(err);
    }
    // Force render the component
    setProjects(projects);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    try {
      await postDeleteProject(id);
      setProjects(projects);
    } catch (err) {
      console.error(err);
    }
    // Force render the component
    setProjects(projects);
  };

  const [projects, setProjects] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchProjects = async () => {
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
      }
    };
    fetchProjects();
  }, []);

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
        >
          Create New Project
        </Button>
      </Box>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            noRowsOverlay={<div>No projects found</div>}
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
