import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

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
      width: 75,
      align: "center",
      renderCell: (params) => (
        <Box>
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

  const handleRerun = (id) => {
    postReRun(id);
  };

  const handleDelete = (id) => {
    postDeleteProject(id);
  };

  const [projects, setProjects] = React.useState([]);
  const navigate = useNavigate();
  const handleOnClick = React.useCallback((params) => {
    if (params.row.status === "completed") {
      const rowId = params.row.id;
      navigate(`./${rowId}`);
    }
  });

  const handleProjectData = (data) => {
    for (const item in data) {
      if (Object.prototype.hasOwnProperty.call(data, item)) {
        data[item]["collaborators"] = data[item]["collaborators"].join(",");
        data[item]["created_at"] = new Date(
          data[item]["created_at"]
        ).toLocaleString("en-US");
        setProjects(data);
      }
    }
  };
  React.useEffect(() => {
    getProjects()
      .then((res) => {
        handleProjectData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ height: { xs: "200px", md: "500px" }, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            noRowsOverlay={<div>No projects found</div>}
            columns={columns}
            rows={projects}
            hideFooter
            onRowClick={handleOnClick}
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
