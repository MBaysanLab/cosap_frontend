import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function VariantStats(props) {
  const data = props.data;

  return (
    <Box
      sx={{
        mb: { xs: 3, md: 1 },
        p: 2,
        borderRadius: 3,
        background: "linear-gradient(45deg, #F2F2F2, #D9D9D9)",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Box>
        <Typography fontSize={14} color="#6D6D6D">
          # of SNPs
        </Typography>
        <Typography variant="h5" color="black">
          {data.number_of_variants}
        </Typography>
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderRightWidth: 1, background: "black", m: 1 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: { xs: "45vw", md: "10vw" },
        }}
      >
        <Box
          sx={{
            m: "3px",
            textAlign: "center",
            background: "#FF5656",
            borderRadius: 3,
          }}
        >
          <Tooltip title="Significant Variants">
            <Typography color="black">
              {data.number_of_significant_variants}
            </Typography>
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
            <Typography color="black">{data.number_of_vus}</Typography>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default VariantStats;
