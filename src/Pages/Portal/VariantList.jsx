import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { VariantSignificanceIcon } from "./VariantSignificanceIcon";
import getVariants from "../../apis/getVariants";

const columns = [
  { field: "#Chr", headerName: "CHR", flex: 0.1 },
  { field: "Start", headerName: "Position", flex: 0.2 },
  { field: "Ref", headerName: "Ref", flex: 0.1 },
  { field: "Alt", headerName: "Alt", flex: 0.1 },
  { field: "Ref.Gene", headerName: "Gene", flex: 0.2 },
  { field: "Func.refGene", headerName: "Function", flex: 0.2 },
  { field: "ExonicFunc.refGene", headerName: "Exonic Function", flex: 0.2 },
  { field: "avsnp147", headerName: "RS ID", flex: 0.2 },
  { field: "AAChange.ensGene", headerName: "AAChange.ensGene", flex: 0.4 },
  { field: "Clinvar", headerName: "Clinvar Significance", flex: 0.4 },
  {
    field: "Classification",
    headerName: "ACMG",
    flex: 0.4,
    renderCell: (params) => {
      return <VariantSignificanceIcon classification={params.value} />;
    },
  },
];

function VariantList() {
  const [variants, setVariants] = React.useState([]);

  React.useEffect(() => {
    getVariants().then((res) => setVariants(res));
  }, []);
  return (
    <Box sx={{ height: { xs: "200px", md: "500px" }, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={variants}
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
