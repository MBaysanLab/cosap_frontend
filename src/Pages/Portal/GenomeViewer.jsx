import * as React from "react";
import {
  Box,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Base64 } from "js-base64";
import igv from "../../../node_modules/igv/dist/igv.esm.min.js";
import storage from "../../utils/storage";
import { API_URL } from "../../config/index.js";

function GenomeViewer(props) {
  // const [IGVBrowser, setIGVBrowser] = React.useState(null);
  const [selectedBams, setSelectedBams] = React.useState([]);
  const igvRef = React.useRef(null);

  const createLoci = () => {
    if (props.variant === null) {
      return;
    }

    try {
      const chrom = props.variant.variant.chrom;
      const start = props.variant.variant.pos - 30;
      const end = props.variant.variant.pos + 30;
      return `${chrom}:${start}-${end}`;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleBamChange = (event) => {
    const {
      target: { value },
    } = event;

    // Convert to array if it's not already (happens when selecting first item)
    const selectedValues = Array.isArray(value) ? value : [value];

    // Make sure we don't have duplicates by checking the name property
    const uniqueValues = [];
    const nameSet = new Set();

    selectedValues.forEach((item) => {
      if (!nameSet.has(item.name)) {
        nameSet.add(item.name);
        uniqueValues.push(item);
      }
    });

    setSelectedBams(uniqueValues);
  };

  const handleDeleteBam = (bamToDelete) => {
    setSelectedBams((prev) =>
      prev.filter((bam) => bam.name !== bamToDelete.name)
    );
  };

  const getTrack = () => {
    if (props.variant === null || selectedBams.length === 0) {
      return [];
    }

    return selectedBams.map((bamFile) => {
      const bamUrl = Base64.encode(bamFile.bam);
      const baiUrl = Base64.encode(bamFile.bai);

      return {
        name: bamFile.name,
        url: `${API_URL}igv/${bamUrl}`,
        indexURL: `${API_URL}igv/${baiUrl}`,
        format: "bam",
        // prettier-ignore
        headers: { "authorization": "token " + storage.getToken() },
      };
    });
  };

  React.useEffect(() => {
    const options = {
      genome: "hg38",
      tracks: getTrack(),
      locus: createLoci(),
    };

    if (selectedBams.length > 0) {
      igv.removeAllBrowsers();
      igv.createBrowser(igvRef.current, options).then(function (browser) {
        console.log("IGV Browser created");
      });
    }
  }, [selectedBams]);

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
          Select BAM files to view variant
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="bam-multiple-chip-label">BAM Files</InputLabel>
          <Select
            labelId="bam-multiple-chip-label"
            id="bam-multiple-chip"
            multiple
            value={selectedBams}
            onChange={handleBamChange}
            input={
              <OutlinedInput id="select-multiple-chip" label="BAM Files" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((bamFile) => (
                  <Chip
                    key={bamFile.name}
                    label={bamFile.name}
                    onDelete={() => handleDeleteBam(bamFile)}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                ))}
              </Box>
            )}
          >
            {Object.entries(props.bam_files).map(([key, value]) => (
              <MenuItem
                key={key}
                value={{ name: key, bam: value.bam, bai: value.bai }}
                disabled={selectedBams.some((bam) => bam.name === key)}
              >
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider sx={{ mt: 2 }} />
      </Box>
      <Box ref={igvRef} style={{ width: "100%", height: "100%" }}></Box>
    </Box>
  );
}

export default GenomeViewer;
