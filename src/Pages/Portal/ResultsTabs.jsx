import * as React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Hidden from "@mui/material/Hidden";
import PropTypes from "prop-types";
import VariantList from "./VariantList";

const menuItems = [
  "SNVs/INDELs",
  "Structural Variants",
  "Copy Number Variations",
  "Fusions",
];

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

function ResultsTabs(props) {
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
              disabled={index === 1 || index === 2 || index === 3}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={activeMenu} index={0}>
          <VariantList
            project_id={props.project_id}
            variant_selector_function={props.variant_selector_function}
            scroll_ref={props.scroll_ref}
          />
        </TabPanel>
        <TabPanel value={activeMenu} index={1}>
          <VariantList
            project_id={props.project_id}
            variant_selector_function={props.variant_selector_function}
            scroll_ref={props.scroll_ref}
          />
        </TabPanel>
        <TabPanel value={activeMenu} index={2}>
          <VariantList
            project_id={props.project_id}
            variant_selector_function={props.variant_selector_function}
            scroll_ref={props.scroll_ref}
          />
        </TabPanel>
        <TabPanel value={activeMenu} index={3}>
          <VariantList
            project_id={props.project_id}
            variant_selector_function={props.variant_selector_function}
            scroll_ref={props.scroll_ref}
          />
        </TabPanel>
      </Box>
    </>
  );
}
export default ResultsTabs;
