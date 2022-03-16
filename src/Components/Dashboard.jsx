import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';

import ServicesWidget from './ServicesWidget';
import LatestActionsWidget from './LatestActionsWidget';

function Dashboard() {
  return (
    <Grid
      container
      spacing={3}
      sx={{display: 'flex', justifyContent: 'space-around'}}
    >
      <Grid item sm={12} md={5}>
        <Card raised sx={{p: {xs: 1, md: 3}}}>
          <Box sx={{display: 'flex', justifyContent: 'center', pb: 2}}>
            <Typography variant="h5">Services</Typography>
          </Box>
          <Divider sx={{mb: 3}} />
          <Box>
            <ServicesWidget />
          </Box>
        </Card>
      </Grid>
      <Grid item sm={12} md={7}>
        <Card raised sx={{p: {xs: 1, md: 3}}}>
          <Box sx={{display: 'flex', justifyContent: 'center', pb: 2}}>
            <Typography variant="h5">Latest Actions</Typography>
          </Box>
          <Divider sx={{mb: 3}} />
          <Box>
            <LatestActionsWidget />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
export default Dashboard;
