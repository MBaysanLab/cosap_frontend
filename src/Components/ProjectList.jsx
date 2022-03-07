import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import CreateProject from './CreateProject'

function ProjectList(props) {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 50,
        maxColumns: 10,
    });
    
    return (
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
    )
}
export default ProjectList