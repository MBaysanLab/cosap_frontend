import * as React from "react";
import { Box } from "@mui/material";
import igv from "../../../node_modules/igv/dist/igv.esm.min.js";
import storage from "../../utils/storage";
import { API_URL } from "../../config/index.js";
import { Base64 } from "js-base64";

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

  const bamUrl = Base64.encode(
    "1_arif0241@hotmail.com/13_somatic_test/CALIBRATED_BAM/calibrated_NORMAL_BWA2.bam"
  );
  const baiUrl = Base64.encode(
    "1_arif0241@hotmail.com/13_somatic_test/CALIBRATED_BAM/calibrated_NORMAL_BWA2.bai"
  );

  const getTrack = () => {
    if (props.variant === null) {
      return [];
    } else {
      return [
        {
          name: "sample",
          url: `${API_URL}igv/${bamUrl}`,
          indexURL: `${API_URL}igv/${baiUrl}`,
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

  return <Box ref={igvRef}></Box>;
}

export default GenomeViewer;
