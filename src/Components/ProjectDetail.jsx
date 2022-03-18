import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import CoverageStats from "./CoverageStats";
import MappingStats from "./MappingStats";
import VariantStats from "./VariantStats";

function ProjectDetail(props) {
  const [coverageStats, setCoverageStats] = React.useState({});
  const [mappingStats, setMappingStats] = React.useState({});
  const [variantStats, setVariantStats] = React.useState({});

  const { id } = useParams();
  React.useEffect(() => {
    fetch(`http://localhost:9000/project_stats/${id}`)
      .then((res) => res.json())
      .then(
        (data) => (
          setCoverageStats(data.coverage_stats),
          setMappingStats(data.mapping_stats),
          setVariantStats(data.variant_stats)
        )
      );
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        <Box
          sx={{
            mb: { xs: 3, md: 1 },
            p: 2,
            borderRadius: 3,
            background:
              "rgba(0, 0, 0, 0) linear-gradient(100.66deg, rgb(67, 67, 67) 6.56%, rgb(0, 0, 0) 93.57%) repeat scroll 0% 0%",
          }}
        >
          <MappingStats data={mappingStats} />
        </Box>
        <Box
          sx={{
            mb: { xs: 3, md: 1 },
            p: 2,
            borderRadius: 3,
            background:
              "rgba(0, 0, 0, 0) linear-gradient(100.66deg, rgb(67, 67, 67) 6.56%, rgb(0, 0, 0) 93.57%) repeat scroll 0% 0%",
          }}
        >
          <CoverageStats data={coverageStats} />
        </Box>
        <Box
          sx={{
            mb: { xs: 3, md: 1 },
            p: 2,
            borderRadius: 3,
            background:
              "rgba(0, 0, 0, 0) linear-gradient(100.66deg, rgb(67, 67, 67) 6.56%, rgb(0, 0, 0) 93.57%) repeat scroll 0% 0%",
          }}
        >
          <VariantStats data={variantStats} />
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectDetail;
