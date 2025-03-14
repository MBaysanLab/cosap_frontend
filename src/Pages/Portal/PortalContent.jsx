import * as React from "react";

// import AssessmentIcon from "@mui/icons-material/Assessment";
import Box from "@mui/material/Box";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Hidden from "@mui/material/Hidden";

import { Link, Outlet, useLocation } from "react-router-dom";

const menuItems = {
  Dashboard: <LineStyleIcon />,
  Projects: <ScatterPlotIcon />,
  // Reports: <AssessmentIcon />,
};

function PortalContent(props) {
  const [activeMenu, setMenu] = React.useState(0);
  const [isSmallScreen, setSmallScreen] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(true);

  const tabsDivRef = React.useRef(null);

  const handleChange = (event, newMenu) => {
    setMenu(newMenu);
  };
  const location = useLocation();

  React.useEffect(() => {
    // Set isSmallScreen to true if screen width is less than 600px
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    mediaQuery.addEventListener("change", () => {
      if (mediaQuery.matches) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }
    });
    // Check if screen width is less than 600px on initial load
    if (mediaQuery.matches) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }

    // On scroll make the side menu smaller
    if (location.pathname === "/portal/projects") {
      tabsDivRef.current.style.width = "180px";
      setMenuOpen(true);
    } else {
      tabsDivRef.current.style.width = "5vw";
      setMenuOpen(false);
    }
  }, [location]);

  return (
    <>
      <Box
        ref={tabsDivRef}
        sx={{
          height: isSmallScreen ? "100%" : "50vh",
          width: { sm: "100%", md: "150px" },
          minWidth: "80px",
          backgroundImage:
            "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);",
          zIndex: "1",
          borderRadius: "0px 30px 30px 0px",
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "column",
          justifyContent: "center",
          position: "sticky",
          top: "20vh",
          transition: "all 0.5s ease",
        }}
      >
        <Tabs
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          value={activeMenu}
          onChange={handleChange}
        >
          {Object.keys(menuItems).map((text, index) => (
            <Tab
              component={Link}
              to={text === "Dashboard" ? "/portal" : text.toLowerCase()}
              key={text}
              icon={
                <Hidden smDown>{isMenuOpen ? menuItems[text] : null}</Hidden>
              }
              label={text}
              iconPosition="start"
              sx={{
                pr: 3,
                color: "white",
                "&.Mui-selected": {
                  background: "white",
                  color: "#171A1E",
                },
                fontSize: isMenuOpen ? "1rem" : "0.7rem",
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: "4px", sm: 1, md: 1 },
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
export default PortalContent;
