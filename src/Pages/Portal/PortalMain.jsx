import * as React from 'react';

import AssessmentIcon from '@mui/icons-material/Assessment';
import Box from '@mui/material/Box';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Hidden from '@mui/material/Hidden';

import {Link, Outlet, Route, Routes} from 'react-router-dom';
import ProjectsMenu from '../../Components/ProjectMenu';
import ProjectList from '../../Components/ProjectList';
import Dashboard from '../../Components/Dashboard';
import CreateProject from '../../Components/CreateProject';

const menuItems = {
  Dashboard: <LineStyleIcon />,
  Projects: <ScatterPlotIcon />,
  Reports: <AssessmentIcon />,
};

const menuPages = {
  Dashboard: <Dashboard />,
  Projects: <ProjectsMenu />,
  Reports: <AssessmentIcon />,
};

function PortalMain() {
  return (
    <Routes>
      <Route path="/" element={<PortalTabs />}>
        <Route index element={menuPages['Dashboard']} />
        <Route path="projects" element={menuPages['Projects']}>
          <Route index element={<ProjectList />} />
          <Route path="create_project" element={<CreateProject />} />
        </Route>
        <Route path="reports" element={menuPages['Reports']} />
      </Route>
    </Routes>
  );
}

function PortalTabs(props) {
  const [activeMenu, setMenu] = React.useState(0);

  const handleChange = (event, newMenu) => {
    setMenu(newMenu);
  };

  return (
    <>
      <Box
        sx={{
          height: 'calc(100vh-70px)',
          width: {sm: '100%', md: '240px'},
          bgcolor: '#DE1E3D',
          mb: {sm: '10px', md: '-130px'},
          zIndex: '1',
        }}
      >
        <Tabs
          orientation="vertical"
          value={activeMenu}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              background: 'black',
            },
          }}
        >
          {Object.keys(menuItems).map((text, index) => (
            <Tab
              component={Link}
              to={text === 'Dashboard' ? '/portal' : text}
              key={text}
              icon={menuItems[text]}
              label={<Hidden smDown>{text}</Hidden>}
              iconPosition="start"
              sx={{
                'color': 'white',
                '&.Mui-selected': {
                  background: 'white',
                  color: 'black',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: {xs: '4px', sm: 1, md: 3},
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
export default PortalMain;
