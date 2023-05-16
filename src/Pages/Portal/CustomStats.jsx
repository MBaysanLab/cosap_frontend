import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function CustomStats(props) {
  const [data1, setData1] = React.useState(props.data1);
  const [data2, setData2] = React.useState(props.data2);
  const [warn1, setWarn1] = React.useState(props.warn1);
  const [warn2, setWarn2] = React.useState(props.warn2);

  React.useEffect(() => {
    setData1(props.data1);
    setData2(props.data2);
    setWarn1(props.warn1);
    setWarn2(props.warn2);
  }, [props.data1, props.data2]);

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
          {props.title1}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            float: "left",
          }}
          color={warn1 ? "#FF5656" : "black"}
        >
          {data1 === "undefined" ? "-" : data1}
        </Typography>
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderRightWidth: 1, background: "black", m: 1 }}
      />
      <Box>
        <Typography fontSize={14} color="#6D6D6D">
          {props.title2}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            float: "right",
          }}
          color={warn2 ? "#FF5656" : "black"}
        >
          {data2 === "undefined" ? "-" : data2}
        </Typography>
      </Box>
    </Box>
  );
}

export default CustomStats;
