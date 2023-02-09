import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import igv from "igv";
import CoverageStats from "./CoverageStats";
import MappingStats from "./MappingStats";
import VariantStats from "./VariantStats";
import ProjectDetailHeader from "./ProjectDetailHeader";
import VariantList from "./VariantList";
import getProjectDetail from "../../apis/getProjectDetail";

function ProjectDetail() {
  const [projectMetadata, setMetadata] = React.useState({});
  const [coverageStats, setCoverageStats] = React.useState({});
  const [mappingStats, setMappingStats] = React.useState({});
  const [variantStats, setVariantStats] = React.useState({});

  const { id } = useParams();
  React.useEffect(() => {
    getProjectDetail(id).then(
      (res) => (
        setMetadata(res.data.metadata),
        setCoverageStats(res.data.coverage_stats),
        setMappingStats(res.data.mapping_stats),
        setVariantStats(res.data.variant_stats)
      )
    );
  }, []);

  React.useEffect(() => {
    const igvDiv = document.getElementById("igv-div");
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

    igv.createBrowser(igvDiv, options).then(function (browser) {
      console.log("Created IGV browser");
    });
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ProjectDetailHeader data={projectMetadata} />
      <Box>
        <Typography variant="h6" color="secondary">
          Basic Stats
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
          <MappingStats data={mappingStats} />
          <CoverageStats data={coverageStats} />
          <VariantStats data={variantStats} />
        </Box>
      </Box>
      <Box sx={{ mt: { xs: 1, md: 3 } }}>
        <Typography variant="h6" color="secondary">
          Variants
        </Typography>
        <Divider />
        <VariantList />
      </Box>
      <Box id="igv-div" sx={{ mt: { xs: 1, md: 3 } }}></Box>
    </Box>
  );
}

export default ProjectDetail;
