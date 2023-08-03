import * as React from "react";
import { Box } from "@mui/material";
import { create } from "filepond";

function GenomeViewer(props) {
  const [isIGVCreated, setIsIGVCreated] = React.useState(false);
  const igvRef = React.useRef(null);

  const createLocus = () => {
    if (props.variant === null) {
      return;
    }

    const { location } = props.variant;

    const chrom = location.split(":")[0];
    const start = location.split(":")[1].split("-")[0] - 100;
    const end = location.split(":")[1].split("-")[1] + 100;
    return `${chrom}:${start}-${end}`;
  };

  const getTrack = () => {
    if (props.variant === null) {
      return [];
    } else {
      return [
        {
          name: "HG00103",
          url: "https://s3.amazonaws.com/1000genomes/data/HG00103/alignment/HG00103.alt_bwamem_GRCh38DH.20150718.GBR.low_coverage.cram",
          indexURL:
            "https://s3.amazonaws.com/1000genomes/data/HG00103/alignment/HG00103.alt_bwamem_GRCh38DH.20150718.GBR.low_coverage.cram.crai",
          format: "cram",
        },
      ];
    }
  };

  React.useEffect(() => {
    // const token = storage.getToken();
    const options = {
      genome: "hg38",
      locus: createLocus(),
      tracks: getTrack(),
    };

    import("igv").then((igv) => {
      if (!isIGVCreated) {
        igv.createBrowser(igvRef.current, options).then(function (browser) {
          console.log("Created IGV browser");
        });
        setIsIGVCreated(true);
      }
    });
  }, [props.variant]);

  return <Box ref={igvRef} sx={{ mt: { xs: 1, md: 3 } }}></Box>;
}

export default GenomeViewer;
