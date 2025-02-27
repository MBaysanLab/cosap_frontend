import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function VariantSignificanceIcon(props) {
  const [bgColor, setbgColor] = React.useState("#747b87");
  const [classification, setClassification] = React.useState("");
  const [significance, setSignificance] = React.useState("");

  React.useEffect(() => {
    if (
      props.classification.toLowerCase().includes("pathogenic") ||
      props.classification.toLowerCase().includes("strong")
    ) {
      setbgColor("#ab0e0e");
    } else if (props.classification.toLowerCase().includes("benign")) {
      setbgColor("#1AB29C");
    }
  });

  React.useEffect(() => {
    if (props.type === "amp") {
      // CancerVar output is in the format "1#Tier_I_strong", split the string and get the tier and significance
      const tier =
        props.classification.split("#")[1].split("_")[0] +
        " " +
        props.classification.split("#")[1].split("_")[1];
      const significance = props.classification.split("#")[1].split("_")[2];
      setClassification(tier);
      setSignificance(significance);
    } else if (props.type === "acmg") {
      // Intervar output is in the format "Pathogenic", no need to split the string
      setClassification(props.classification);
      setSignificance("");
    }
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Box
        sx={{
          backgroundColor: bgColor,
          width: "10px",
          height: "100%",
          borderRadius: "5px 0 0 5px",
        }}
      >
        {/* Empty div */}
        <Box sx={{ width: "10px", height: "100%" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "10px",
        }}
      >
        <Typography fontSize={"0.6rem"} color={"grey"}>
          {props.type.toUpperCase()}
        </Typography>
        <Typography fontSize={"0.7rem"} color={"black"} textAlign="center">
          {classification}
        </Typography>
        <Typography fontSize={"0.6rem"} color={bgColor} textAlign="center">
          {significance}
        </Typography>
      </Box>
    </Box>
  );
}
