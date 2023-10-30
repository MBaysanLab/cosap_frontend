import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "20vw",
    },
  },
};

function getStyles(name, selectedFiles, theme) {
  return {
    background: selectedFiles.indexOf(name) === -1 ? "#fff" : "#E5F6FD",
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [fileNames, setFileNames] = React.useState([]);
  const [fileNamesDict, setFileNamesDict] = React.useState({});

  React.useEffect(() => {
    // Chech if filenames populated
    const fileNamesDict = props.fileNames;
    setFileNamesDict(fileNamesDict);
    if (Object.keys(fileNamesDict).length > 0) {
      // Set fileNames to props.fileNames
      setFileNames(
        Object.keys(fileNamesDict).map(function (key) {
          return fileNamesDict[key];
        })
      );
    }
  }, [props]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFiles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  React.useEffect(() => {
    // For every value in selectedFiles, get uuid from fileNames dict
    // and set props file selector to that array of uuids
    const uuids = [];
    selectedFiles.map((value) => {
      Object.keys(fileNamesDict).map(function (key) {
        if (fileNamesDict[key] === value) {
          uuids.push(key);
        }
      });
    });
    props.fileSetter(uuids);
  }, [selectedFiles]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-chip-label">{props.title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedFiles}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Select Files" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {fileNames.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedFiles, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
