import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { VariantSignificanceIcon } from "./VariantSignificanceIcon";
import DetailTabls from "./DetailTabs";
import getVariants from "../../apis/getVariants";

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

const VariantRow = (props) => {
  console.log(props);
  return (
    <Accordion
      elevation={3}
      sx={{
        borderRadius: "5px",
        marginX: "5px",
        marginTop: "10px",
        width: "100%",
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          marginX: "5px",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        sx={{
          minHeight: "70px",
          padding: "0px",
          "& .MuiAccordionSummary-content": {
            margin: "0px",
            height: "70px",
          },
        }}
      >
        <Grid container spacing={0} sx={{ height: "100%" }}>
          <Grid item xs={1} sx={{ height: "100%" }}>
            <VariantSignificanceIcon
              classification={props.row.cancervar_classification}
              type="amp"
            />
          </Grid>
          <Grid item xs={1} sx={{ height: "100%" }}>
            <VariantSignificanceIcon
              classification={props.row.intervar_classification}
              type="acmg"
            />
          </Grid>
          <Grid item xs={2} sx={{ height: "100%" }}>
            {props.row.gene_symbol || "N/A"}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <DetailTabls variant={props.row} />
      </AccordionDetails>
    </Accordion>
  );
};

function VariantList(props) {
  const [variants, setVariants] = React.useState([]);
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

  // const handleButtonClick = () => {
  //   const payload = {
  //     ids: selectedRows.map((index) => variants[index - 1].id),
  //   };
  //   getVariantReports(payload);
  // };

  // const handleSelectionChange = (selection) => {
  //   setSelectedRows(selection);
  // };

  const handleRowClick = (params, event) => {
    props.variant_selector_function(params.row);
    props.scroll_ref();
  };

  return (
    <Box sx={{ height: { xs: "200px", md: "400px" }, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            // onSelectionModelChange={handleSelectionChange}
            headerHeight={0}
            columns={columns}
            rows={variants}
            components={{
              Row: VariantRow,
              Header: () => null,
            }}
            onRowClick={handleRowClick}
            disableSelectionOnClick
            initialState={{
              sorting: {
                sortModel: [{ field: "classification", sort: "asc" }],
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
