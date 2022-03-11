import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Complete, Ongoing, FileUpload} from './StatusIcons'

const columns = [
  { field: "id", headerName: "ID", flex:0.1},
  { field: "name", headerName: "Project Name", flex: 1 },
  { field: "creation_date", headerName: "Creation Date", flex: 0.3 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.3,
    align: "center",
    renderCell: (params) => {
      switch (params.value.split("-")[0]) {
        case "completed":
          return (<Complete value={params.value.split("-")[1]}/>);
        case "file_upload":
          return (<FileUpload value={params.value.split("-")[1]}/>)
        case "ongoing":
          return (<Ongoing value={params.value.split("-")[1]}/>)
      }
    },
  },
  { field: "collaborators", headerName: "Collaborators", flex: 0.5 },
];

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
            sx={{
              border: 0,
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
