/* eslint-disable max-len */
import * as React from "react";
import Box from "@mui/material/Box";
import Carousel from "react-multi-carousel";
import Typography from "@mui/material/Typography";
import FeatureCard from "./FeatureCard";

import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1920 },
    items: 4,
  },
  smallDesktop: {
    breakpoint: { max: 1920, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Features() {
  return (
    <Box
      sx={{
        paddingTop: 5,
        paddingBottom: 20,
        backgroundColor: "#171A1E",
      }}
    >
      <Box
        sx={{
          paddingBottom: { xs: 5, md: 10 },
          textAlign: "center",
        }}
      >
        <Typography variant="h3" color="white">
          Features
        </Typography>
      </Box>
      <Carousel
        responsive={responsive}
        autoPlay
        infinite
        draggable={false}
        focusOnSelect
        arrows={false}
      >
        <FeatureCard
          bgImage="linear-gradient(210deg, rgba(44, 114, 219, 1.0) 0%, rgba(163, 137, 175, 1.0) 68%)"
          header="Germline & Somatic Variant Detection"
        >
          Predefined workflows with several algorithm options for detection of
          both somatic and germline variants in WGS and WES data.
        </FeatureCard>
        <FeatureCard
          bgImage="linear-gradient(45deg, rgba(47, 223, 187, 1.0) 0%, rgba(34, 149, 174, 1.0) 65%)"
          header="Copy Number Variation Analysis"
        >
          Detection of abnormal number of copies.
        </FeatureCard>
        <FeatureCard
          bgImage="linear-gradient(200deg, #30cfd0 0%, #330867 65%);"
          header="Automated ACMG/AMP Classification"
        >
          Each variant is classified with more than 15 criteria as defined in
          ACMG&AMP guidelines.
        </FeatureCard>
        <FeatureCard
          bgImage="linear-gradient(135deg, #667eea 0%, #764ba2 65%);"
          header="PharmGKB Drug Annotations"
        >
          Report of known drug responses of variants found in your data.
        </FeatureCard>
        <FeatureCard
          bgImage="linear-gradient(220deg, #5ee7df 0%, #b490ca 65%);"
          header="Integrated Genome Viewer"
        >
          Inspect mutations more comprehensively with integrated genome viewer.
        </FeatureCard>
      </Carousel>
    </Box>
  );
}

export default Features;
