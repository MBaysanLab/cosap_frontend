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
import DetailTabs from "./DetailTabs";

// import storage from "../../utils/storage";

function ProjectDetail() {
  const [projectMetadata, setMetadata] = React.useState({});
  const [activeVariant, setActiveVariant] = React.useState(null);
  const [projectSummary, setProjectSummary] = React.useState({});
  const [bamFile, setBamFile] = React.useState(null);

  const detailTabsRef = React.useRef(null);

  const { id } = useParams();
  React.useEffect(() => {
    getProjectDetail(id).then(
      (res) => (
        setMetadata(res.data.metadata),
        setProjectSummary(res.data.summary),
        setBamFile(res.data.bam_file)
      )
    );
  }, []);

  const selectVariant = (variant) => {
    setActiveVariant(variant);
  };

  const scrollToVariantDetail = () => {
    detailTabsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ProjectDetailHeader data={projectMetadata} />
      <Box>
        <Typography variant="h6">Summary</Typography>
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
            data1={projectSummary.mapped_reads}
            data2={projectSummary.mean_coverage}
            title1="Mapped Reads %"
            title2="Mean Coverage"
          />
          <CustomStats
            data1={projectSummary.msi_score}
            data2={projectSummary.cnv_count}
            title1="MSI Score %"
            title2="# of CNV's"
          />
          <VariantStats data={projectSummary} />
        </Box>
      </Box>
      <Box sx={{ mt: { xs: 1, md: 3 } }}>
        <Divider />
        <ResultsTabs
          project_id={id}
          variant_selector_function={selectVariant}
          scroll_ref={scrollToVariantDetail}
        />
      </Box>
      <Box ref={detailTabsRef} sx={{ mt: { xs: 1, md: 3 } }}>
        <DetailTabs variant={activeVariant} bam_file={bamFile} />
      </Box>
      {/*  <Box id="igv-div" sx={{ mt: { xs: 1, md: 3 } }}></Box>  */}
    </Box>
  );
}

export default ProjectDetail;
