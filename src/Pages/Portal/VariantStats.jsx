import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

function VariantStats(props) {
  const data = props.data;

  return (
    <Box
      sx={{
        mb: { xs: 3, md: 1 },
        p: 2,
        borderRadius: 3,
        background:
          "rgba(0, 0, 0, 0) linear-gradient(100.66deg, rgb(67, 67, 67) 6.56%, rgb(0, 0, 0) 93.57%) repeat scroll 0% 0%",

        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Box>
        <Typography variant="h6" color="primary">
          Number of Variants
        </Typography>
        <Typography variant="h2" color="primary">
          {data.total_variants}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          width: { xs: "45vw", md: "10vw" },
        }}
      >
        <Box
          sx={{
            m: "3px",
            textAlign: "center",
            background: "#f54242",
            borderRadius: 3,
          }}
        >
          <Tooltip title="Significant Variants">
            <Typography color="primary">{data.significant_variants}</Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{
            m: "3px",
            textAlign: "center",
            background: "grey",
            borderRadius: 3,
          }}
        >
          <Tooltip title="Uncertain Variants">
            <Typography color="primary">{data.uncertain_variants}</Typography>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default VariantStats;
