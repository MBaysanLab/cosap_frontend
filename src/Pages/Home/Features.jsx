/* eslint-disable max-len */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useMediaQuery, useTheme } from "@mui/material";
import FeatureCard from "./FeatureCard";
import featuresBg from "../../assets/images/featuresbg.png";

function Features() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const scrollContainerRef = React.useRef(null);
  const [touchStart, setTouchStart] = React.useState(null);
  const [touchEnd, setTouchEnd] = React.useState(null);

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
      header: "Integrated Genome Viewer",
      content:
        "Inspect mutations more comprehensively with integrated genome viewer.",
    },
  ];

  const totalItems = featureItems.length;
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);

  // Function to handle swipe gestures on mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance > 50;
    const isSwipeUp = distance < -50;

    if (isSwipeDown) {
      handleScroll("next");
    }
    if (isSwipeUp) {
      handleScroll("prev");
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleScroll = (direction) => {
    let newIndex;
    // Implement cyclic scrolling
    if (direction === "next") {
      newIndex =
        currentItemIndex === totalItems - 1
          ? 0 // Loop back to start
          : currentItemIndex + 1;
    } else {
      newIndex =
        currentItemIndex === 0
          ? totalItems - 1 // Loop to end
          : currentItemIndex - 1;
    }

    setCurrentItemIndex(newIndex);
  };

  // Calculate the active indicator based on the current item index
  const getActiveIndicator = (idx) => {
    return idx === currentItemIndex;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#171A1E",
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: { xs: "auto", md: 600 },
        minHeight: { xs: 500, md: 600 },
        overflow: "hidden",
      }}
    >
      {/* Features section */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          paddingRight: { xs: 2, md: 2 },
          paddingTop: { xs: 3, md: 5 },
          paddingBottom: { xs: 3, md: 5 },
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          color="white"
          sx={{
            mb: { xs: 2, md: 3 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Features
        </Typography>

        {/* Feature presentation container */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Up navigation button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 1, md: 2 },
              zIndex: 2,
            }}
          >
            <IconButton
              onClick={() => handleScroll("prev")}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(4px)",
                borderRadius: "12px",
                padding: isMobile ? "4px 8px" : "6px 12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transform: "translateY(0)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                },
                display: "flex",
              }}
            >
              <KeyboardArrowUpIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>

          {/* Card display area */}
          <Box
            ref={scrollContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 300, md: 350 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginX: 5,
              maxWidth: { xs: "100%", md: "100%" },
            }}
          >
            {featureItems.map((item, index) => (
              <Box
                key={index}
                className="feature-item"
                sx={{
                  position: "absolute",
                  width: "100%",
                  maxWidth: { xs: "90%", md: "95%" },
                  height: "auto",
                  opacity: currentItemIndex === index ? 1 : 0,
                  visibility: currentItemIndex === index ? "visible" : "hidden",
                  transition: "opacity 0.5s ease, visibility 0.5s ease",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: currentItemIndex === index ? 1 : 0,
                }}
              >
                <FeatureCard
                  header={item.header}
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: { xs: 3, md: 4 },
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    borderRadius: "16px",
                    "& h6": {
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                      marginBottom: { xs: 1, md: 1.5 },
                      color: "white",
                    },
                    "& p": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      lineHeight: { xs: 1.5, md: 1.6 },
                      color: "rgba(255, 255, 255, 0.85)",
                    },
                  }}
                >
                  {item.content}
                </FeatureCard>
              </Box>
            ))}
          </Box>

          {/* Down navigation button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { xs: 1, md: 2 },
              zIndex: 2,
            }}
          >
            <IconButton
              onClick={() => handleScroll("next")}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(4px)",
                borderRadius: "12px",
                padding: isMobile ? "4px 8px" : "6px 12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transform: "translateY(0)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transform: "translateY(2px)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                },
                display: "flex",
              }}
            >
              <KeyboardArrowDownIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Vertical dots indicator */}
      <Box
        sx={{
          position: { xs: "absolute", md: "absolute" },
          right: { xs: 12, md: "50%" },
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          zIndex: 2,
        }}
      >
        {featureItems.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => setCurrentItemIndex(idx)}
            sx={{
              width: isMobile ? 6 : 8,
              height: isMobile ? 6 : 8,
              borderRadius: "50%",
              backgroundColor: getActiveIndicator(idx)
                ? "white"
                : "rgba(255, 255, 255, 0.3)",
              margin: "2px 0",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: getActiveIndicator(idx) ? "scale(1.2)" : "scale(1)",
              boxShadow: getActiveIndicator(idx)
                ? "0 0 6px rgba(255,255,255,0.5)"
                : "none",
            }}
          />
        ))}
      </Box>

      {/* Background image */}
      <Box
        component="img"
        src={featuresBg}
        alt="Features Background"
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "100%", md: "100%" },
          position: { xs: "absolute", md: "relative" },
          opacity: { xs: 0.15, md: 0.3 },
          zIndex: 0,
          objectFit: "cover",
          top: 0,
          left: 0,
        }}
      />
    </Box>
  );
}

export default Features;
