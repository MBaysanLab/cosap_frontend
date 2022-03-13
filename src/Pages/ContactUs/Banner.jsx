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
                    Contact Us
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
                    Feel free to contact us through any of the provided information or by filling out the form. <br/>
                    We will get back to you as soon as possible.
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
