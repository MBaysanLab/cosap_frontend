import * as React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

let bg_image = process.env.REACT_APP_PUBLIC_URL + '/img/headerbackground.jpg'

const BannerStyles = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#ffffff',
            dark: '#7896a6',
        },
        secondary: {
            main: '#00e2f5',
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
            <Box sx={{
                top:0,
                pb:"5%",
                backgroundImage: `url(${bg_image})`,
                backgroundSize: "cover",
                textAlign: 'center',
            }}>
                <Typography
                    variant='h2'
                    sx={{
                        pt: {xs:"2vh", md:"10vh"},
                        color: "white",
                        fontWeight: 1000
                        
                    }}
                >
                    Flexible Next Generation <br />
                    Sequencing Analysis
                </ Typography>
                <Typography
                    paragraph
                    sx={{
                        pt:5,
                        pb:"5vh",
                        color:"white",
                        fontSize: {xs:15, md:20}
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
                color="primary"
                >
                    Create Account for Free Trial
                </Button>
            </ Box>
        </ThemeProvider>
    )
}
export default Banner
