import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import getUserActions from "../../apis/getUserActions";

const columns = [
  {
    field: "action_type",
    headerName: "Action",
    flex: 0.3,
    renderCell: (params) => {
      switch (params.value) {
        case "file_upload":
          return <Box>Uploaded a file successfully.</Box>;
        case "project_creation":
          return <Box>Created a project successfully.</Box>;
        case "report_creation":
          return <Box>Created a report created successfully.</Box>;
      }
    },
  },
  {
    field: "action_detail",
    headerName: "Detail",
    flex: 0.5,
  },
  {
    field: "created_at",
    headerName: "Action Time",
    flex: 0.2,
    valueGetter: (date) => {
      date = new Date(date.value);
      return date.toLocaleString();
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
            getRowId={(row) => row.id}
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
