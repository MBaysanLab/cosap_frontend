import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

export function Complete(props) {
  return (
    <Box
      sx={{
        p: '5px',
        backgroundColor: '#5be5a5',
        borderRadius: '155px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <DoneIcon color="#ffffff" />
      <Typography variant="body" sx={{display: 'inline'}}>
        Completed
      </Typography>
    </Box>
  );
}

export function Ongoing(props) {
  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
      <CircularProgress
        variant="determinate"
        value={Number(props.value)}
        color="progress"
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export function FileUpload(props) {
  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Box sx={{position: 'relative', display: 'inline-flex'}}>
        <Box sx={{width: 100, mr: 1}}>
          <LinearProgress
            variant="determinate"
            value={props.value}
            color="progress"
            sx={{
              height: '20px',
            }}
          />
        </Box>
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 5,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.primary"
          >
                  Uploading Files
          </Typography>
        </Box>
      </Box>
      <Box sx={{minWidth: 30}}>
        <Typography
          variant="caption"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
