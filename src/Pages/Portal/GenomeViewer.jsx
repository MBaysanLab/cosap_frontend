import * as React from "react";
import { Box } from "@mui/material";
import igv from "../../../node_modules/igv/dist/igv.esm.min.js";
import storage from "../../utils/storage";
import { API_URL } from "../../config/index.js";
import { Base64 } from "js-base64";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

function GenomeViewer(props) {
  // const [IGVBrowser, setIGVBrowser] = React.useState(null);
  const [bam, setBam] = React.useState("");
  const [bai, setBai] = React.useState("");
  const igvRef = React.useRef(null);

  const createLoci = () => {
    if (props.variant === null) {
      return;
    }

    try {
      const { location } = props.variant;
      const chrom = location.split("_")[0];
      const start = parseInt(location.split("_")[1]) - 30;
      const end = parseInt(location.split("_")[1]) + 30;
      return `${chrom}:${start}-${end}`;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleBamChange = (event) => {
    setBam(event.target.value.bam);
    setBai(event.target.value.bai);
  };

  const getTrack = () => {
    const bamUrl = Base64.encode(bam);
    const baiUrl = Base64.encode(bai);

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

    if (bam !== "") {
      igv.removeAllBrowsers();
      igv.createBrowser(igvRef.current, options).then(function (browser) {
        console.log("IGV Browser created");
      });
    }
  }, [bam]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          margin: 2,
        }}
      >
        <Typography fontSize={"1rem"} mb={2}>
          Select BAM file to view variant
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Bam File</InputLabel>
          <Select value={bam} label="Bam" onChange={handleBamChange}>
            {Object.entries(props.bam_files).map(([key, value]) => (
              <MenuItem key={value.bam} value={value.bam}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider />
      </Box>
      <Box ref={igvRef} style={{ width: "100%", height: "100%" }}></Box>
    </Box>
  );
}

export default GenomeViewer;
