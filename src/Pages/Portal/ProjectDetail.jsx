import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import CoverageStats from "./CoverageStats";
import MappingStats from "./MappingStats";
import VariantStats from "./VariantStats";
import ProjectDetailHeader from "./ProjectDetailHeader";
import VariantList from "./VariantList";
import getProjectDetail from "../../apis/getProjectDetail";
import drugPdf from "../../assets/pharmcat_example_report.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ProjectDetail(props) {
  const [projectMetadata, setMetadata] = React.useState({});
  const [coverageStats, setCoverageStats] = React.useState({});
  const [mappingStats, setMappingStats] = React.useState({});
  const [variantStats, setVariantStats] = React.useState({});
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

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
      <Box sx={{ mt: { xs: 1, md: 3 } }}>
        <Typography variant="h6">Drug Report</Typography>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Document file={drugPdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale="2" />
          </Document>
          <Box>
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectDetail;
