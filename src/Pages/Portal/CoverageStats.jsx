import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function CoverageStats(props) {
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
          Mean Coverage
        </Typography>
        <Typography variant="h2" color="primary">
          {data.median_coverage}
        </Typography>
      </Box>
      <Box sx={{ width: { xs: "55vw", md: "15vw" } }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data.hist}>
            <XAxis dataKey="0" tick={{ fill: "#fff" }} />
            <Tooltip />
            <Bar dataKey="1" fill="#1DB954" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default CoverageStats;
