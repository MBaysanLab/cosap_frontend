import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { VariantSignificanceIcon } from "./VariantSignificanceIcon";

const columns = [
  { field: "location", headerName: "Position", flex: 0.2 },
  { field: "ref", headerName: "Ref", flex: 0.1 },
  { field: "alt", headerName: "Alt", flex: 0.1 },
  { field: "gene_symbol", headerName: "Gene", flex: 0.2 },
  { field: "function", headerName: "Function", flex: 0.2 },
  { field: "rs_id", headerName: "RS_ID", flex: 0.2 },
  { field: "aa_change", headerName: "AAChange", flex: 0.4 },
  {
    field: "clinvar_classification",
    headerName: "Clinvar Significance",
    flex: 0.4,
  },
  {
    field: "classification",
    headerName: "classification",
    flex: 0.4,
    renderCell: (params) => {
      return <VariantSignificanceIcon classification={params.value} />;
    },
  },
];

function VariantList(props) {
  return (
    <Box sx={{ height: { xs: "200px", md: "500px" }, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={props.data}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "black",
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
export default VariantList;
