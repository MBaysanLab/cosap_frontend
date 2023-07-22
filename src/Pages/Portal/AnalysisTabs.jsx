import * as React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Hidden from "@mui/material/Hidden";
import PropTypes from "prop-types";
import OverViewTable from "./OverViewTable";
import TagList from '../../Components/Graph/Tag';
import DetailsTable from "./DetailsTable";
import VariantStats from "./VariantStats";






const menuItems = [
  "OVERVIEW",
  "DETAILS",
  "IGV"
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

function AnalysisTabs(props) {
  const [activeMenu, setMenu] = React.useState(0);

  const handleChange = (event, newMenu) => {
    setMenu(newMenu);
  };
 
  React.useEffect(() => {
    const igvDiv = document.getElementById("igv-div");
    // const token = storage.getToken();
    const options = {
      genome: "hg38",
      locus: "chr8:127,736,588-127,739,371",
      tracks: [
        {
          name: "HG00103",
          url: "https://s3.amazonaws.com/1000genomes/data/HG00103/alignment/HG00103.alt_bwamem_GRCh38DH.20150718.GBR.low_coverage.cram",
          indexURL:
            "https://s3.amazonaws.com/1000genomes/data/HG00103/alignment/HG00103.alt_bwamem_GRCh38DH.20150718.GBR.low_coverage.cram.crai",
          format: "cram",
        },
      ],
    };
  
    import("igv").then((igv) => {
      igv.createBrowser(igvDiv, options).then(function (browser) {
        console.log("Created IGV browser");
      });
    });
  }, []);
  

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
              disabled={text === "Copy Number Variations"}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={activeMenu} index={0}>
        <OverViewTable
          variantDetail = {props.variantDetail}
        />
        </TabPanel>

        <TabPanel value={activeMenu} index={1}>
        
        <DetailsTable
          variantDetail ={props.variantDetail}
        />



        </TabPanel>
        <TabPanel value={activeMenu} index={2}>
          <Box id="igv-div" sx={{ mt: { xs: 1, md: 3 } }}></Box> 
        </TabPanel>

      </Box>
    </>
  );
}
export default AnalysisTabs;
