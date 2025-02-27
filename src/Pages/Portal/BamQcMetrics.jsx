import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function BamQcMetrics({ qcSummary }) {
  if (!qcSummary) {
    return null;
  }

  return (
    <Box sx={{ p: 1, border: "1px solid #ddd", borderRadius: "8px", mt: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ p: 0.2, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.7rem" }}>Total Reads</Typography>
          <Typography variant="body2">
            {qcSummary.total_reads || "N/A"}
          </Typography>
        </Box>
        <Box sx={{ p: 0.2, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.7rem" }}>Mapped Reads %</Typography>
          <Typography variant="body2">
            {qcSummary.mapped_reads || "N/A"}
          </Typography>
        </Box>
        <Box sx={{ p: 0.2, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.7rem" }}>Mean Coverage</Typography>
          <Typography variant="body2">
            {qcSummary.mean_coverage || "N/A"}
          </Typography>
        </Box>
        <Box sx={{ p: 0.2, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.7rem" }}>
            Duplication Rate %
          </Typography>
          <Typography variant="body2">
            {qcSummary.duplication_rate || "N/A"}
          </Typography>
        </Box>
        <Box sx={{ p: 0.2, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.7rem" }}>Insert Size</Typography>
          <Typography variant="body2">
            {qcSummary.insert_size || "N/A"}
          </Typography>
        </Box>
        <Box sx={{ p: 0.2, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.7rem" }}>Error Rate %</Typography>
          <Typography variant="body2">
            {qcSummary.error_rate || "N/A"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default BamQcMetrics;
