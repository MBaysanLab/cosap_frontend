import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function QualityStats(props) {
  const mappedReads = props.mapped_reads.percetange_of_mapped_reads;
  const meanCoverage = props.mean_coverage.mean_coverage;

  return (
    <Box
      sx={{
        mb: { xs: 3, md: 1 },
        p: 2,
        borderRadius: 3,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:
          "rgba(0, 0, 0, 0) linear-gradient(100.66deg, rgb(67, 67, 67) 6.56%, rgb(0, 0, 0) 93.57%) repeat scroll 0% 0%",

        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h6" color="#6D6D6D">
          Mapped Reads
        </Typography>
        <Typography
          variant="h2"
          color="black"
          sx={{
            float: "left",
          }}
        >
          {mappedReads}%
        </Typography>
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderRightWidth: 1, background: "white", m: 1 }}
      />
      <Box>
        <Typography variant="h6" color="#6D6D6D">
          Mean Coverage
        </Typography>
        <Typography
          variant="h2"
          color="black"
          sx={{
            float: "right",
          }}
        >
          {meanCoverage}
        </Typography>
      </Box>
    </Box>
  );
}

export default QualityStats;
