import * as React from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';
import CssBaseline from '@mui/material/CssBaseline';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import FolderIcon from '@mui/icons-material/Folder';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Dashboard from "./Dashboard"

const menuItems = {
    "Dashboard": <LineStyleIcon />,
    "Projects": <FolderIcon />,
    "Analyses": <ScatterPlotIcon />,
    "Reports": <AssessmentIcon />,
}

const menuPages = {
    "Dashboard": <Dashboard />,
    "Projects": <FolderIcon />,
    "Analyses": <ScatterPlotIcon />,
    "Reports": <AssessmentIcon />,
}

function PortalMenu(props) {
    const [activeMenu, setMenu] = React.useState(0)
    const [activePage, setPage] = React.useState(<Dashboard />)

    const handleChange = (event, newValue) => {
        setMenu(newValue);
        setPage(menuPages[Object.keys(menuItems)[newValue]]);
    };

    return (
        <>
            <Box sx={{
                maxWidth: {xs:"100%", md:"240px"},
            }}>
                <CssBaseline />
                <Tabs
                    orientation={props.orientation}
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                    value={activeMenu}
                    onChange={handleChange}
                >
                    {Object.keys(menuItems).map((text, index) => (
                        <Tab
                            key={text}
                            icon={menuItems[text]}
                            label={text}
                            iconPosition="start"
                        />
                    ))}
                </Tabs>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: {xs:"4px", sm:1, md:3},
                }}
            >
               {activePage}
            </Box>

        </>
    )
}
export default PortalMenu