import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';

function ProjectsList() {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 50,
        maxColumns: 10,
    });

    return (
        <Card raised sx={{ p: { xs: 1, md: 3 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
                <Box sx={{ width: 100 }}>
                    <Typography variant="h5">
                        Projects
                    </Typography>
                </Box>
                <Button variant='text' size="small" startIcon={<AddIcon />}>Create New Project</Button>
            </Box>
            <Box sx={{ height: { xs: "200px", md: "300px" }, width: "100%" }}>
                <Box sx={{ display: "flex", height: "100%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <DataGrid
                            hideFooter
                            density='compact'
                            {...data} />
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}
export default ProjectsList