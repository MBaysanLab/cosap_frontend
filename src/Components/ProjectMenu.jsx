import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Link, Outlet} from 'react-router-dom';

function ProjectMenu() {
  const [isCreateActice, setCreateActive] = React.useState(true);

  function handleCreateButton() {
    setCreateActive(!isCreateActice);
  }

  React.useEffect(() => {
    setCreateActive(!window.location.pathname.includes('create_project'));
  }, []);

  return (
    <Card raised sx={{p: {xs: 1, md: 3}}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>
        <Box sx={{width: 100}}>
          <Typography variant="h5">Projects</Typography>
        </Box>
        {isCreateActice ? (
          <Button
            component={Link}
            to="create_project"
            variant="text"
            size="small"
            startIcon={<AddIcon />}
            color="button"
            onClick={handleCreateButton}
          >
            Create New Project
          </Button>
        ) : (
          <Button
            component={Link}
            to=""
            size="large"
            startIcon={<ArrowBackIosIcon />}
            color="button"
            onClick={handleCreateButton}
          ></Button>
        )}
      </Box>
      <Divider sx={{mb: 3}} />
      <Outlet />
    </Card>
  );
}
export default ProjectMenu;
