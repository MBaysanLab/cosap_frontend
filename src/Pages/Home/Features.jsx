import * as React from "react";
import Box from "@mui/material/Box";
import FeatureCard from "../../Components/FeatureCard";

function Features() {
  return (
    <Box
      sx={{
        pt: 5,
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <FeatureCard
        header="Germline & Somatic Variant Detection"
        media={process.env.REACT_APP_PUBLIC_URL + "/img/headerbackground.jpg"}
      >
        Predefined workflows with several algorithm options for detection of
        both somatic and germline variants in WGS and WES data.
      </FeatureCard>
      <FeatureCard
        header="Copy Number Variation Analysis"
        media={process.env.REACT_APP_PUBLIC_URL + "/img/cnv_scatter.png"}
      >
        Detection of abnormal number of copies
      </FeatureCard>
      <FeatureCard
        header="Variant Classification According to ACMG Guidelines"
        media={process.env.REACT_APP_PUBLIC_URL + "/img/acmg.png"}
      >
        Each variant is classified with more than 15 criteria as defined in
        ACMG&AMP guidelines.
      </FeatureCard>
      <FeatureCard
        header="PharmGKB Drug Annotations"
        media={process.env.REACT_APP_PUBLIC_URL + "/img/drug.jpg"}
      >
        Report of known drug responses of variants found in your data.
      </FeatureCard>
      <FeatureCard
        header="Integrated Genome Viewer"
        media={process.env.REACT_APP_PUBLIC_URL + "/img/igv.png"}
      >
        Inspect mutations more comprehensively with integrated genome viewer.
      </FeatureCard>
    </Box>
  );
}

export default Features;
