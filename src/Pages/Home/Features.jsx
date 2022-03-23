/* eslint-disable max-len */
import * as React from "react";
import Box from "@mui/material/Box";
import FeatureCard from "../../Components/FeatureCard";
import aiLogo from "../../assets/images/ai-150x119.png";
import meta from "../../assets/images/meta-new-190x114.png";
import synth from "../../assets/images/synth-2.png";
import high from "../../assets/images/high.png";
import igv from "../../assets/images/igv.png";

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
      <FeatureCard header="Germline & Somatic Variant Detection" media={aiLogo}>
        Predefined workflows with several algorithm options for detection of
        both somatic and germline variants in WGS and WES data.
      </FeatureCard>
      <FeatureCard header="Copy Number Variation Analysis" media={meta}>
        Detection of abnormal number of copies
      </FeatureCard>
      <FeatureCard
        header="Variant Classification According to ACMG Guidelines"
        media={synth}
      >
        Each variant is classified with more than 15 criteria as defined in
        ACMG&AMP guidelines.
      </FeatureCard>
      <FeatureCard header="PharmGKB Drug Annotations" media={high}>
        Report of known drug responses of variants found in your data.
      </FeatureCard>
      <FeatureCard header="Integrated Genome Viewer" media={igv}>
        Inspect mutations more comprehensively with integrated genome viewer.
      </FeatureCard>
    </Box>
  );
}

export default Features;
