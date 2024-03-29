import * as React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Hidden from "@mui/material/Hidden";
import PropTypes from "prop-types";
import OverviewTable from "./OverviewTable";
import DetailsTable from "./DetailsTable";
import GenomeViewer from "./GenomeViewer";

const menuItems = ["OVERVIEW", "DETAILS", "GENOME VIEWER"];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function DetailTabs(props) {
  const [activeMenu, setMenu] = React.useState(0);

  const handleChange = (event, newMenu) => {
    setMenu(newMenu);
  };

  return (
    <>
      <Box>
        <Tabs
          orientation="horizontal"
          value={activeMenu}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              height: "4px",
              background: "#171A1E",
            },
          }}
        >
          {menuItems.map((text, index) => (
            <Tab
              key={text}
              label={<Hidden smDown>{text}</Hidden>}
              iconPosition="start"
              sx={{
                "&.Mui-selected": {
                  background: "white",
                  color: "#171A1E",
                },
              }}
              {...a11yProps(index)}
              disabled={index === 1}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={activeMenu} index={0}>
          <OverviewTable variant={props.variant} />
        </TabPanel>
        <TabPanel value={activeMenu} index={1}>
          <DetailsTable variant={props.variant} />
        </TabPanel>
        <TabPanel value={activeMenu} index={2}>
          <GenomeViewer
            variant={props.variant}
            bam_file={props.bam_file}
            project_id={props.project_id}
          />
        </TabPanel>
      </Box>
    </>
  );
}
export default DetailTabs;
