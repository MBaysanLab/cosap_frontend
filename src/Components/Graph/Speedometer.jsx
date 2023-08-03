import React, { Component } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Box from "@mui/material/Box";

function Speedometer(props) {
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setIsDataLoaded(props.value && props.value !== null);
    if (isDataLoaded) {
      setValue(props.value);
    }
  }, [props]);

  return (
    <PieChart width={150} height={90}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        cx={75}
        cy={80}
        data={[
          {
            name: "vaf",
            value: value,
          },
          {
            name: "vaf",
            value: 100 - value,
            fill: "rgba(0,0,0,0.1)",
          },
        ]}
        outerRadius={70}
        innerRadius={60}
      />
      {isDataLoaded ? (
        <text x={65} y={70} fill="black" dominantBaseline="central">
          {`${props.value.toFixed(0)}%`}
        </text>
      ) : (
        <text x={65} y={70} fill="black" dominantBaseline="central">
          N/A
        </text>
      )}
    </PieChart>
  );
}

export default Speedometer;
