import * as React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function MappingStats(props) {
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
          Mapped Reads
        </Typography>
        <Typography variant="h2" color="primary">
          {data.percetange_of_mapped_reads}%
        </Typography>
      </Box>
      <Box sx={{ width: { xs: "40vw", md: "15vw" } }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              stroke="none"
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={[
                {
                  name: "mapped_reads",
                  value: data.percetange_of_mapped_reads,
                },
                {
                  name: "mapped_reads",
                  value: 100 - data.percetange_of_mapped_reads,
                  fill: "black",
                },
              ]}
              cx="50%"
              cy="101%"
              outerRadius={100}
              innerRadius={40}
              fill="#1DB954"
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default MappingStats;
