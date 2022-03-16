import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function AlgorithmSelector(props) {
  return (
    <Box>
      <Typography color="#1164a7" sx={{pb: 2}}>
        {props.title}
      </Typography>
      <Autocomplete
        multiple
        options={props.options}
        defaultValue={props.options.slice(0, 1)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder={props.type}
          />
        )}
      />
    </Box>
  );
}
export default AlgorithmSelector;
