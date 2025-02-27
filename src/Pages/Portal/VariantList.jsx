import * as React from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { VariantSignificanceIcon } from "./VariantSignificanceIcon";
import FilterToolbar from "./VariantFilterToolbar";
import getVariants from "../../apis/getVariants";
import VariantRow from "./ExpandableVariantRow";
import { romanToInt } from "../../utils/utils";
import preLodaer from "../../assets/images/preloader.gif";
import { useQuery } from "react-query";

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

const filterModelBase = [
  {
    label: "ACMG",
    type: "button",
    filters: [
      { label: "Pathogenic", value: "pathogenic", active: false },
      { label: "Likely Pathogenic", value: "likely_pathogenic", active: false },
      { label: "VUS", value: "uncertain_significance", active: false },
    ],
  },
  {
    label: "AMP",
    type: "button",
    filters: [
      { label: "Tier I", value: "pathogenic", active: false },
      { label: "Tier II", value: "likely_pathogenic", active: false },
      { label: "VUS", value: "vus", active: false },
    ],
  },
  {
    label: "ClinVar",
    type: "button",
    filters: [
      { label: "Pathogenic", value: "pathogenic", active: false },
      {
        label: "Likely Pathogenic",
        value: "likely_pathogenic",
        active: false,
      },
      { label: "VUS", value: "vus", active: false },
    ],
  },
  {
    label: "Consequence",
    type: "button",
    filters: [
      { label: "Exonic", value: "exon", active: false },
      { label: "Intronic", value: "intron", active: false },
      { label: "Splicing", value: "splice", active: false },
    ],
  },
  {
    label: "Gene_Symbol",
    type: "input",
    filters: [{ label: "Symbol", value: "", active: false }],
  },
  {
    label: "rsID",
    type: "input",
    filters: [{ label: "rsID", value: "", active: false }],
  },
];

function VariantList(props) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);
  const [filterModel, setFilterModel] = React.useState(filterModelBase);
  const apiRef = useGridApiRef();

  // Fetch variants with filters and pagination
  const { isLoading, isError, data, error } = useQuery(
    ["variants", page, pageSize, filterModel],
    () => getVariants(props.project_id, page + 1, pageSize, filterModel),
    {
      keepPreviousData: true,
    }
  );
  const [rowCountState, setRowCountState] = React.useState(data?.total || 0);

  // Update row count when data changes
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.total !== undefined ? data?.total : prevRowCountState
    );
  }, [data?.total, setRowCountState]);

  // Apply predefined filter
  const handleFilterApply = (filterModel) => {
    setFilterModel(filterModel);
    setPage(0); // Reset to first page when applying filters
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilterModel(filterModelBase);
    setPage(0); // Reset to first page when clearing filters
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <img src={preLodaer} alt="preloader" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <p>Error loading data: {error.message}</p>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "1000px", width: "100%" }}>
      <FilterToolbar
        onFilterApply={handleFilterApply}
        onClearFilters={handleClearFilters}
        filterModel={filterModel}
      />
      <Box sx={{ display: "flex", height: "calc(100% - 60px)" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            rowCount={rowCountState}
            apiRef={apiRef}
            columns={columns}
            pagination
            paginationMode="server"
            rows={data.snvs}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            filterMode="server"
            components={{
              Row: VariantRow,
              Header: () => null,
            }}
            componentsProps={{
              row: {
                project_type: props.project_type,
                bam_files: props.bam_files,
                apiRef: apiRef,
              },
            }}
            disableSelectionOnClick
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader": {
                display: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                marginTop: "0 !important",
              },
            }}
            disableVirtualization
          />
        </Box>
      </Box>
    </Box>
  );
}

export default VariantList;
