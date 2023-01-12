import * as React from "react";

import AssessmentIcon from "@mui/icons-material/Assessment";
import Box from "@mui/material/Box";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Hidden from "@mui/material/Hidden";

import { Link, Outlet } from "react-router-dom";

const menuItems = {
  Dashboard: <LineStyleIcon />,
  Projects: <ScatterPlotIcon />,
  Reports: <AssessmentIcon />,
};

function PortalTabs(props) {
  const [activeMenu, setMenu] = React.useState(0);

  const handleChange = (event, newMenu) => {
    setMenu(newMenu);
  };
  const isSmallScreen = window.innerWidth < 900;

  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 68.5px);",
          width: { sm: "100%", md: "240px" },
          backgroundImage:
            "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);",
          mb: { sm: "10px", md: "-130px" },
          zIndex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Tabs
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          value={activeMenu}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              background: "#171A1E",
              width: 10,
            },
          }}
        >
          {Object.keys(menuItems).map((text, index) => (
            <Tab
              component={Link}
              to={text === "Dashboard" ? "/portal" : text}
              key={text}
              icon={menuItems[text]}
              label={<Hidden smDown>{text}</Hidden>}
              iconPosition="start"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  background: "white",
                  color: "#171A1E",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: "4px", sm: 1, md: 3 },
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
export default PortalTabs;
