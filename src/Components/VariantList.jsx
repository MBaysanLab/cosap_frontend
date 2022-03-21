import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "#Chr", headerName: "CHR", flex: 0.05 },
  { field: "Ref", headerName: "Ref", flex: 0.1 },
  { field: "Alt", headerName: "Alt", flex: 0.1 },
  { field: "Ref.Gene", headerName: "Gene", flex: 0.2 },
  { field: "Func.refGene", headerName: "Function", flex: 0.2 },
  { field: "ExonicFunc.refGene", headerName: "Exonic Function", flex: 0.2 },
  { field: "avsnp147", headerName: "RS ID", flex: 0.2 },
  { field: "AAChange.ensGene", headerName: "AAChange.ensGene", flex: 0.4 },
  { field: "clinvar:Clinvar", headerName: "Clinvar Significance", flex: 0.4 },
  { field: "Classification", headerName: "Significance", flex: 0.4 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.3,
    align: "center",
    renderCell: (params) => {},
  },
];

function VariantList() {
  const [variants, setVariants] = React.useState([]);
  const navigate = useNavigate();
  const handleOnClick = React.useCallback((params) =>
    navigate(`./${params.id}`)
  );

  React.useEffect(() => {
    fetch("http://localhost:9000/variants")
      .then((res) => res.json())
      .then((data) => setVariants(data));
  }, []);
  return (
    <Box sx={{ height: { xs: "200px", md: "500px" }, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={variants}
            hideFooter
            onRowClick={handleOnClick}
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
export default VariantList;
