import React, { Component } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Box from "@mui/material/Box";

function HalfCircleSlider(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
                  value: 80,
                },
                {
                  name: "mapped_reads",
                  value: 100 - 80,
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
      <text
        style={{ "text-transform": "uppercase" }}
        x="100"
        y="100"
        textAnchor="middle"
        dy=".3em"
        fontSize="20"
      >
        afdss
      </text>
    </div>
  );
}

export default HalfCircleSlider;
