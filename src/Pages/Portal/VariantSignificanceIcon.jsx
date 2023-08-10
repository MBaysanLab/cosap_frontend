import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function VariantSignificanceIcon(props) {
  const [bgColor, setbgColor] = React.useState("#aaaab7");
  React.useEffect(() => {
    if (props.classification.toLowerCase().includes("pathogenic")) {
      setbgColor("#f54242");
    } else if (props.classification.toLowerCase().includes("benign")) {
      setbgColor("#b0e5c6");
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
      <Typography fontSize={"0.755rem"}>{props.classification}</Typography>
    </Box>
  );
}
