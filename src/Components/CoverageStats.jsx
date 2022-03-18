import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function CoverageStats(props) {
  const data = props.data;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Box>
        <Typography variant="h6" color="primary">
          Mean Coverage
        </Typography>
        <Typography variant="h2" color="primary">
          {data.mean_coverage}
        </Typography>
      </Box>
      <Box sx={{ width: { xs: "55vw", md: "15vw" } }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data.coverage_hist}>
            <XAxis dataKey="coverage" tick={{ fill: "#fff" }} />
            <Tooltip />
            <Bar dataKey="number_of_locations" fill="#1DB954" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default CoverageStats;
