import * as React from "react"
import NavBar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Box from '@mui/material/Box'
import PortalMenu from './PortalMenu'

function Portal() {

    const isSmallScreen = window.innerWidth < 900

    return (
        <>
            <NavBar />
            <Box sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                flex: 1
            }}>
                <PortalMenu 
                orientation={isSmallScreen ? "horizontal" : "vertical"}/>
            </Box>
            <Footer />
        </>
    )
}

export default Portal