import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Project Name" },
  { field: "creation_date", headerName: "Creation Date" },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => {
      switch (params.value) {
        case "Success":
          return (
            <Box
              sx={{
                p:"3px",
                backgroundColor: "#5be5a5",
                borderRadius: "155px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <DoneIcon color="#ffffff" />
              <Typography sx={{ display: "inline" }}>{params.value}</Typography>
            </Box>
          );
          case "Uploading files":
            return (
              <Box
              sx={{
                p:"3px",
                backgroundColor: "#f5f779",
                borderRadius: "155px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FileUploadIcon color="#ffffff" />
              <Typography sx={{ display: "inline" }}>{params.value}</Typography>
            </Box>
            )
      }
    },
  },
  { field: "collaborators", headerName: "Collaborators" },
];

console.log(columns);

function ProjectList(props) {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:9000/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <Box sx={{ height: { xs: "200px", md: "300px" }, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={projects}
            hideFooter
            density="compact"
            sx={{
              border: 0,
              fontFamily: "Poppins",
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#de1e3d",
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
