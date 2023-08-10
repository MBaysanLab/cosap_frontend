import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { VariantSignificanceIcon } from "./VariantSignificanceIcon";
import getVariants from "../../apis/getVariants";
import getVariantReports from "../../apis/getVariantReports";
import { PropaneSharp } from "@mui/icons-material";

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
  const [variants, setVariants] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  React.useEffect(() => {
    getVariants(props.project_id).then((res) => {
      setVariants(res.data);
    });
  }, []);

  const handleButtonClick = () => {
    let payload = { ids: selectedRows.map((index) => variants[index - 1].id) };
    getVariantReports(payload);
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };
  function handlegetVariantDetails(event) {
    props.getAndSetVariantDetail(event.id);
  }

  return (
    <Box sx={{ height: { xs: "200px", md: "500px" }, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            onSelectionModelChange={handleSelectionChange}
            checkboxSelection
            columns={columns}
            rows={variants}
            onRowClick={handlegetVariantDetails}
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
          <button onClick={handleButtonClick}>Download</button>
        </Box>
      </Box>
    </Box>
  );
}
export default VariantList;
