import * as React from "react";

import AssessmentIcon from "@mui/icons-material/Assessment";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const menuItems = {
  Dashboard: <LineStyleIcon sx={{ color: "black" }} />,
  Projects: <FolderIcon sx={{ color: "black" }} />,
  Analyses: <ScatterPlotIcon sx={{ color: "black" }} />,
  Reports: <AssessmentIcon sx={{ color: "black" }} />,
};

const menuPages = {
  Dashboard: <Dashboard />,
  Projects: <FolderIcon />,
  Analyses: <ScatterPlotIcon />,
  Reports: <AssessmentIcon />,
};

function PortalMain(props) {
  const [activeMenu, setMenu] = React.useState(0);
  const [activePage, setPage] = React.useState(<Dashboard />);

  const handleChange = (event, newValue) => {
    setMenu(newValue);
    setPage(menuPages[Object.keys(menuItems)[newValue]]);
  };

  return (
    <>
      <Box
        sx={{
          height: "calc(100vh-70px)",
          width: "240px",
          bgcolor: "#DE1E3D",
          mb: "-130px",
          zIndex: "1",
        }}
      >
        <CssBaseline />
        <Tabs
          orientation={props.orientation}
          sx={{ borderRight: 1, borderColor: "divider" }}
          value={activeMenu}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              background: "black",
              width: "3px",
            },
          }}
        >
          {Object.keys(menuItems).map((text, index) => (
            <Tab
              key={text}
              icon={menuItems[text]}
              label={text}
              iconPosition="start"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  background: "white",
                  color: "black",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: { xs: "4px", sm: 1, md: 3 },
        }}
      >
        {activePage}
      </Box>
    </>
  );
}
export default PortalMain;
