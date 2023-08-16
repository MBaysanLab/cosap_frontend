import * as React from "react";
import { Box } from "@mui/material";
import igv from "../../../node_modules/igv/dist/igv.esm.min.js";
import storage from "../../utils/storage";
import { API_URL } from "../../config/index.js";

function GenomeViewer(props) {
  const [IGVBrowser, setIGVBrowser] = React.useState(null);
  const igvRef = React.useRef(null);

  const createLoci = () => {
    if (props.variant === null) {
      return;
    }

    const { location } = props.variant;
    const chrom = location.split(":")[0];
    const start = parseInt(location.split(":")[1].split("-")[0]) - 30;
    const end = parseInt(location.split(":")[1].split("-")[1]) + 30;
    return `${chrom}:${start}-${end}`;
  };

  const getTrack = () => {
    if (props.variant === null) {
      return [];
    } else {
      return [
        {
          name: "sample",
          url: `${API_URL}/igv/calibrated_tumor_bwa2.bam`,
          indexURL: `${API_URL}/igv/calibrated_tumor_bwa2.bai`,
          format: "bam",
          // prettier-ignore
          headers: { "authorization": "token " + storage.getToken() },
        },
      ];
    }
  };

  React.useEffect(() => {
    const options = {
      genome: "hg38",
      tracks: getTrack(),
      locus: createLoci(),
    };

    if (!IGVBrowser) {
      igv.createBrowser(igvRef.current, options).then(function (browser) {
        setIGVBrowser(browser);
      });
    } else {
      IGVBrowser.search(createLoci());
    }
  }, [props.variant]);

  return <Box ref={igvRef} sx={{ mt: { xs: 1, md: 3 } }}></Box>;
}

export default GenomeViewer;
