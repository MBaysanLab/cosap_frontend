import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import CoverageStats from "./CoverageStats";
import MappingStats from "./MappingStats";
import VariantStats from "./VariantStats";
import ProjectDetailHeader from "./ProjectDetailHeader";
import VariantList from "./VariantList";

function ProjectDetail(props) {
  const [projectMetadata, setMetadata] = React.useState({});
  const [coverageStats, setCoverageStats] = React.useState({});
  const [mappingStats, setMappingStats] = React.useState({});
  const [variantStats, setVariantStats] = React.useState({});

  const { id } = useParams();
  React.useEffect(() => {
    fetch(`http://localhost:9000/project_stats/${id}`)
      .then((res) => res.json())
      .then(
        (data) => (
          setMetadata(data.metadata),
          setCoverageStats(data.coverage_stats),
          setMappingStats(data.mapping_stats),
          setVariantStats(data.variant_stats)
        )
      );
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ProjectDetailHeader data={projectMetadata} />
      <Box>
        <Typography variant="h6">Basic Stats</Typography>
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
        <Typography variant="h6">Variants</Typography>
        <Divider />
        <VariantList />
      </Box>
    </Box>
  );
}

export default ProjectDetail;
