import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "action",
    headerName: "Action",
    flex: 0.8,
    renderCell: (params) => {
      switch (params.value[0]) {
        case "file_upload":
          return (
            <Box>
              File <strong>{params.value[1]}</strong> is uploaded successfully.
            </Box>
          );
        case "project_creation":
          return (
            <Box>
              Project <strong>{params.value[1]}</strong> is created
              successfully.
            </Box>
          );
        case "report_creation":
          return (
            <Box>
              Report <strong>{params.value[1]}</strong> is created successfully.
            </Box>
          );
        case "sample_inspection":
          return (
            <Box>
              You inspected <strong>{params.value[1]}</strong>.
            </Box>
          );
      }
    },
  },
  { field: "time", headerName: "Time", flex: 0.2 },
];

function LatestActionsWidget(props) {
  const [actions, setProjects] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:9000/actions")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <Box sx={{ height: { xs: "200px", md: "300px" }, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={actions}
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

export default LatestActionsWidget;