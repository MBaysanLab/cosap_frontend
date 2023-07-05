import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import CustomStats from "./CustomStats";
import VariantStats from "./VariantStats";
import ProjectDetailHeader from "./ProjectDetailHeader";
import ResultsTabs from "./ResultsTabs";
import getProjectDetail from "../../apis/getProjectDetail";
import AnalysisTabs from "./AnalysisTabs";





// import storage from "../../utils/storage";

function ProjectDetail() {
  const [projectMetadata, setMetadata] = React.useState({});
  const [coverageStats, setCoverageStats] = React.useState({});
  const [mappingStats, setMappingStats] = React.useState({});
  const [variantStats, setVariantStats] = React.useState({});
  const [msiStats, setMsiStats] = React.useState({});
  const [cnvStats, setCnvStats] = React.useState({});

  const { id } = useParams();
  React.useEffect(() => {
    getProjectDetail(id).then(
      (res) => (
        setMetadata(res.data.metadata),
        setCoverageStats(res.data.coverage_stats),
        setMappingStats(res.data.mapping_stats),
        setVariantStats(res.data.variant_stats),
        setMsiStats(res.data.msi_stats),
        setCnvStats(res.data.cnv_stats)
        //
      )
    );
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ProjectDetailHeader data={projectMetadata} />
      <Box>
        <Typography variant="h6" color="secondary">
          Summary
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            mt: 3,
          }}
        >
          <CustomStats
            data1={mappingStats.percetange_of_mapped_reads}
            data2={coverageStats.mean_coverage}
            title1="Mapped Reads %"
            title2="Mean Coverage"
          />
          <CustomStats
            title1="MSI Score %"
            title2="# of CNV's"
          />
          <VariantStats data={variantStats} />
        </Box>
      </Box>
      <Box sx={{ mt: { xs: 1, md: 3 } }}>
        <Divider />
        <ResultsTabs project_id={id} />
      </Box>
       {/*<Box id="igv-div" sx={{ mt: { xs: 1, md: 3 } }}></Box>*/}
      
      <AnalysisTabs />
      
      

    </Box>
    
  );
}

export default ProjectDetail;
