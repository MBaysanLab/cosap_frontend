import * as React from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { VariantSignificanceIcon } from "./VariantSignificanceIcon";
import getVariants from "../../apis/getVariants";
import VariantRow from "./ExpandableVariantRow";
import { romanToInt } from "../../utils/utils";

const columns = [
  {
    field: "intervar_classification",
    headerName: "ACMG Classification",
    flex: 0.4,
    renderCell: (params) => {
      return <VariantSignificanceIcon classification={params.value} />;
    },
  },
  {
    field: "cancervar_classification",
    headerName: "AMP Classification",
    flex: 0.4,
    renderCell: (params) => {
      return <VariantSignificanceIcon classification={params.value} />;
    },

    // The tier numbering is in roman numerals, so we need to convert it to a number
    sortComparator: (v1, v2, cellParams1, cellParams2) => {
      return (
        romanToInt(v1.split("#")[1].split("_")[0]) -
        romanToInt(v2.split("#")[1].split("_")[0])
      );
    },
  },
  { field: "gene_symbol", headerName: "Gene", flex: 0.2 },
  { field: "location", headerName: "Position", flex: 0.3 },
  { field: "function", headerName: "Function", flex: 0.2 },
  {
    field: "clinvar_classification",
    headerName: "Clinvar Significance",
    flex: 0.4,
  },
];

function VariantList(props) {
  const [variants, setVariants] = React.useState([]);
  const apiRef = useGridApiRef();
  // const [selectedRows, setSelectedRows] = React.useState([]);
  React.useEffect(() => {
    getVariants(props.project_id)
      .then((res) => {
        setVariants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ height: "1000px", width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            // onSelectionModelChange={handleSelectionChange}
            apiRef={apiRef}
            columns={columns}
            rows={variants}
            components={{
              Row: VariantRow,
              Header: () => null,
            }}
            componentsProps={{
              row: {
                bam_files: props.bam_files,
                apiRef: apiRef,
              },
            }}
            disableSelectionOnClick
            initialState={{
              sorting: {
                sortModel: [
                  { field: "cancervar_classification", sort: "desc" },
                ],
              },
            }}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader": {
                display: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                marginTop: "0 !important",
              },
            }}
          />
          {/* <button onClick={handleButtonClick}>
            Create Report With Selected Variants
          </button> */}
        </Box>
      </Box>
    </Box>
  );
}
export default VariantList;
