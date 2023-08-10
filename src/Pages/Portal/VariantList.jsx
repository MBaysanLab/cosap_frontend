import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { VariantSignificanceIcon } from "./VariantSignificanceIcon";
import getVariants from "../../apis/getVariants";
import getVariantReports from "../../apis/getVariantReports";

const columns = [
  {
    field: "classification",
    headerName: "Pathogenicity",
    flex: 0.4,
    renderCell: (params) => {
      return <VariantSignificanceIcon classification={params.value} />;
    },
  },
  { field: "gene_symbol", headerName: "Gene", flex: 0.2 },
  { field: "function", headerName: "Function", flex: 0.2 },
  {
    field: "clinvar_classification",
    headerName: "Clinvar Significance",
    flex: 0.4,
  },
  { field: "location", headerName: "Position", flex: 0.3 },
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

  const handleRowClick = (params, event) => {
    props.variant_selector_function(params.row);
    props.scroll_ref();
  };

  return (
    <Box sx={{ height: { xs: "200px", md: "500px" }, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            onSelectionModelChange={handleSelectionChange}
            checkboxSelection
            columns={columns}
            rows={variants}
            onRowClick={handleRowClick}
            disableSelectionOnClick
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "black",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-row": {
                borderBottom: "1px solid #E0E0E0",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "#e4eced",
              },
              "& .MuiCheckbox-root.Mui-checked": {
                color: "#3f51b5",
              },
            }}
          />
          <button onClick={handleButtonClick}>
            Create Report With Selected Variants
          </button>
        </Box>
      </Box>
    </Box>
  );
}
export default VariantList;
