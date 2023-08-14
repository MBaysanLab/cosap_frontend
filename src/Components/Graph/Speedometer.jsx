import React from "react";
import { Pie, PieChart } from "recharts";

function Speedometer(props) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(props.value);
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
      {value ? (
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
