/* eslint-disable max-len */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import FeatureCard from "./FeatureCard";
import featuresBg from "../../assets/images/featuresbg.png";
import { Stack, useMediaQuery, useTheme } from "@mui/material";

function Features() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [scrollPosition, setScrollPosition] = React.useState(0);
  const scrollContainerRef = React.useRef(null);

  // Define all feature cards data
  const featureItems = [
    {
      header: "Germline & Somatic Variant Detection",
      content:
        "Predefined workflows with several algorithm options for detection of both somatic and germline variants in WGS and WES data.",
    },
    {
      header: "Copy Number Variation Analysis",
      content: "Detection of abnormal number of copies.",
    },
    {
      header: "Automated ACMG/AMP Classification",
      content:
        "Each variant is classified with more than 15 criteria as defined in ACMG&AMP guidelines.",
    },
    {
      header: "PharmGKB Drug Annotations",
      content: "Report of known drug responses of variants found in your data.",
    },
    {
      header: "Integrated Genome Viewer",
      content:
        "Inspect mutations more comprehensively with integrated genome viewer.",
    },
  ];

  // Calculate visible items and card width
  const visibleItems = isMobile ? 1 : isTablet ? 2 : 3;
  const totalItems = featureItems.length;

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.offsetWidth * 0.8;
      const newPosition =
        direction === "next"
          ? Math.min(
              scrollPosition + scrollAmount,
              container.scrollWidth - container.offsetWidth
            )
          : Math.max(scrollPosition - scrollAmount, 0);

      setScrollPosition(newPosition);
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        paddingTop: 5,
        paddingBottom: 20,
        backgroundColor: "#171A1E",
        position: "relative",
      }}
    >
      <Box
        sx={{
          paddingBottom: { xs: 5, md: 10 },
          textAlign: "left",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography variant="h3" color="white">
          Features
        </Typography>
      </Box>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            onClick={() => handleScroll("prev")}
            sx={{
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
              display: scrollPosition <= 0 ? "none" : "flex",
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>

          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              width: "100%",
              padding: 2,
            }}
          >
            {featureItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  flex: `0 0 ${100 / visibleItems}%`,
                  maxWidth: `${100 / visibleItems}%`,
                  paddingX: 2,
                  transition: "transform 0.3s ease",
                }}
              >
                <FeatureCard header={item.header}>{item.content}</FeatureCard>
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => handleScroll("next")}
            sx={{
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
              display:
                scrollContainerRef.current &&
                scrollPosition >=
                  scrollContainerRef.current.scrollWidth -
                    scrollContainerRef.current.offsetWidth
                  ? "none"
                  : "flex",
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        </Stack>

        {/* Dots indicator */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          {Array.from({ length: Math.ceil(totalItems / visibleItems) }).map(
            (_, idx) => (
              <Box
                key={idx}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const newPosition =
                      (scrollContainerRef.current.scrollWidth /
                        Math.ceil(totalItems / visibleItems)) *
                      idx;
                    setScrollPosition(newPosition);
                    scrollContainerRef.current.scrollTo({
                      left: newPosition,
                      behavior: "smooth",
                    });
                  }
                }}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor:
                    idx ===
                    Math.floor(
                      scrollPosition /
                        (scrollContainerRef.current?.offsetWidth || 1)
                    )
                      ? "white"
                      : "rgba(255, 255, 255, 0.3)",
                  margin: "0 4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              />
            )
          )}
        </Box>
      </Box>

      <Box
        component="img"
        src={featuresBg}
        alt="Features Background"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          opacity: 0.3,
          zIndex: 0,
        }}
      />
    </Box>
  );
}

export default Features;
