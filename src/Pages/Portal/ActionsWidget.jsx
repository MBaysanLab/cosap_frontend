import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import getUserActions from "../../apis/getUserActions";

const columns = [
  {
    field: "action_type",
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
  {
    field: "created",
    headerName: "Action Time",
    flex: 0.2,
    valueGetter: (date) => {
      return date;
    },
  },
];

function ActionsWidget() {
  const [actions, setProjects] = React.useState([]);
  React.useEffect(() => {
    getUserActions().then((res) => setProjects(res.data));
  }, []);

  return (
    <Box sx={{ height: { xs: "200px", md: "300px" }, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={actions}
            getRowId={(row) => row.created}
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

export default ActionsWidget;
