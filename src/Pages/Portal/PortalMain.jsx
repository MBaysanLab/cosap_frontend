import * as React from "react";

import AssessmentIcon from "@mui/icons-material/Assessment";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ProjectsDash from "../../Components/ProjectDash";
import FolderIcon from "@mui/icons-material/Folder";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Hidden from "@mui/material/Hidden";

const menuItems = {
  Dashboard: <LineStyleIcon />,
  Projects: <FolderIcon />,
  Analyses: <ScatterPlotIcon />,
  Reports: <AssessmentIcon />,
};

const menuPages = {
  Dashboard: <ScatterPlotIcon />,
  Projects: <ProjectsDash />,
  Analyses: <ScatterPlotIcon />,
  Reports: <AssessmentIcon />,
};

function PortalMain(props) {
  const [activeMenu, setMenu] = React.useState(0);
  const [activePage, setPage] = React.useState(<ScatterPlotIcon />);

  const handleChange = (event, newValue) => {
    setMenu(newValue);
    setPage(menuPages[Object.keys(menuItems)[newValue]]);
  };

  return (
    <>
      <Box
        sx={{
          height: "calc(100vh-70px)",
          width: { sm: "100%", md: "240px" },
          bgcolor: "#DE1E3D",
          mb: { sm: "10px", md: "-130px" },
          zIndex: "1",
        }}
      >
        <CssBaseline />
        <Tabs
          orientation={props.orientation}
          value={activeMenu}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              background: "black",
            },
          }}
        >
          {Object.keys(menuItems).map((text, index) => (
            <Tab
              key={text}
              icon={menuItems[text]}
              label={<Hidden smDown>{text}</Hidden>}
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
          p: { xs: "4px", sm: 1, md: 3 },
        }}
      >
        {activePage}
      </Box>
    </>
  );
}
export default PortalMain;
