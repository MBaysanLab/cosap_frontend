import React, { Component } from 'react';
import {
  Box,
  Typography
 } from '@mui/material';


function Depth(props) {
  return (
    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <Typography variant="body2" component="div" gutterBottom>
        Depth
      </Typography>
      <Typography variant="h4" component="div" gutterBottom>
        {props.value}
      </Typography>
    </Box>

  );
}

export default Depth;