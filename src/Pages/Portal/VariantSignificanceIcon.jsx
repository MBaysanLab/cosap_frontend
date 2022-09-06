import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function VariantSignificanceIcon(props) {
  const [bgColor, setbgColor] = React.useState("#aaaab7");
  React.useEffect(() => {
    if (props.classification === "Pathogenic") {
      setbgColor("#f54242");
    } else if (props.classification === "Likely benign") {
      setbgColor("#b0e5c6");
    } else if (props.classification === "Benign") {
      setbgColor("#39E382");
    }
  });

  return (
    <Box
      sx={{
        p: "5px",
        textAlign: "center",
        background: bgColor,
        borderRadius: 3,
      }}
    >
      <Typography fontSize={"0.875rem"}>{props.classification}</Typography>
    </Box>
  );
}
