import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function VariantSignificanceIcon(props) {
  const [bgColor, setbgColor] = React.useState("#747b87");
  React.useEffect(() => {
    if (
      props.classification.toLowerCase().includes("pathogenic") ||
      props.classification.toLowerCase().includes("strong")
    ) {
      setbgColor("#ab0e0e");
    } else if (props.classification.toLowerCase().includes("benign")) {
      setbgColor("#276136");
    }
  });

  return (
    <Box
      sx={{
        p: "5px",
        textAlign: "center",
        borderRadius: 3,
      }}
    >
      <Typography
        fontSize={"0.755rem"}
        color={bgColor}
        sx={{ fontWeight: "bold" }}
      >
        {props.classification}
      </Typography>
    </Box>
  );
}
