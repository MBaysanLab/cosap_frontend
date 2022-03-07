import * as React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ReactComponent as BannerSVG } from '../../images/banner.svg'

const BannerStyles = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#ffffff',
            dark: '#7896a6',
        },
        secondary: {
            main: '#DE1E3D',
        },
        action: {
            active: "#001E3C",
        }
    },
    typography: {
        fontFamily: 'Poppins',
    },
});

function Banner() {
    return (
        <ThemeProvider theme={BannerStyles}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly"
                }}
            >
                <Box>
                    <BannerSVG />
                </Box>
                <Box>
                    <Typography
                        variant='h2'
                        sx={{
                            pt: { xs: "2vh", md: "10vh" },
                            fontWeight: 1000

                        }}
                    >
                        Flexible <br />Next Generation <br />
                        Sequencing Analysis
                    </ Typography>
                    <Typography
                        paragraph
                        sx={{
                            pt: 5,
                            pb: "5vh",
                            fontSize: { xs: 15, md: 20 }
                        }}
                    >
                        Fully customizable cloud-based NGS analysis platform <br />
                        that allows users to select algorithms and adjust parameters. <br />
                        No technical expertise is required!
                    </ Typography>
                    <Button
                        component={NavLink}
                        to="/signup"
                        variant="outlined"
                        size="large"
                        color="secondary"
                    >
                        Create Account for Free Trial
                    </Button>
                </ Box>
            </Box>
        </ThemeProvider>
    )
}
export default Banner
