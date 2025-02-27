import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import ProjectDetailHeader from "./ProjectDetailHeader";
import ResultsTabs from "./ResultsTabs";
import getProjectDetail from "../../apis/getProjectDetail";
import FileBrowser from "./FileBrowser";
import getProjectFiles from "../../apis/getProjectFiles";
import DocumentViewerModal from "./DocumentViewerModal";
import { extractAllFilesFromFileMap } from "../../utils/utils";
import BamQcMetrics from "./BamQcMetrics";

function ProjectDetail() {
  const [projectMetadata, setMetadata] = React.useState({});
  const [projectQCSummary, setProjectQCSummary] = React.useState({});
  const [projectFileMap, setProjectFileMap] = React.useState(null);
  const [rootFolderId, setRootFolderId] = React.useState(null);
  const [docViewerModalOpen, setDocViewerModalOpen] = React.useState(false);
  const [docUri, setDocUri] = React.useState(null);
  const [modalFileName, setModalFileName] = React.useState(null);
  const [bamFiles, setBamFiles] = React.useState({});

  const { id } = useParams();

  const extractBamFiles = (fileMap) => {
    const bamFiles = {};
    for (const file in fileMap) {
      if (fileMap[file].name.endsWith(".bam")) {
        bamFiles[fileMap[file].name] = {
          bam: fileMap[file].path,
        };
      }
    }

    const fileMapValues = extractAllFilesFromFileMap(fileMap);
    // Check if all bam files have a corresponding bai file filemap, if not remove the bam file since igv requires bam index
    for (const bamFile in bamFiles) {
      if (
        fileMapValues.includes(bamFiles[bamFile].bam.replace(".bam", ".bai"))
      ) {
        bamFiles[bamFile]["bai"] = bamFiles[bamFile].bam.replace(
          ".bam",
          ".bai"
        );
      } else if (fileMapValues.includes(bamFiles[bamFile].bam + ".bai")) {
        bamFiles[bamFile]["bai"] = bamFiles[bamFile].bam + ".bai";
      } else {
        delete bamFiles[bamFile];
      }
    }

    return bamFiles;
  };

  React.useEffect(() => {
    // Get metadata and summary
    getProjectDetail(id)
      .then(
        (res) => (
          setMetadata(res.data.metadata),
          setProjectQCSummary(res.data.qc_summary)
        )
      )
      .catch((err) => {
        console.log(err);
      });

    // Get project files
    getProjectFiles(id)
      .then((res) => {
        setProjectFileMap(res.data.file_map);
        setRootFolderId(res.data.root_folder_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    setBamFiles(extractBamFiles(projectFileMap));
  }, [projectFileMap]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ProjectDetailHeader data={projectMetadata} />
      <BamQcMetrics qcSummary={projectQCSummary} />
      <Box sx={{ mt: 1 }}>
        <Typography variant="h6">Variants</Typography>
        <Divider />
        <ResultsTabs
          project_id={id}
          project_type={projectMetadata.project_type}
          bam_files={bamFiles}
        />
      </Box>
      <Box sx={{ mt: { xs: 1, md: 3 } }}>
        <Typography variant="h6">Files</Typography>
        <Divider />
        <FileBrowser
          fileMap={projectFileMap}
          rootFolderId={rootFolderId}
          docViewModalOpenSetter={setDocViewerModalOpen}
          docViewUriSetter={setDocUri}
          modalFileNameSetter={setModalFileName}
        />
        <DocumentViewerModal
          docUri={docUri}
          open={docViewerModalOpen}
          docViewModalOpenSetter={setDocViewerModalOpen}
          fileName={modalFileName}
        />
      </Box>
      {/*  <Box id="igv-div" sx={{ mt: { xs: 1, md: 3 } }}></Box>  */}
    </Box>
  );
}

export default ProjectDetail;
