import * as React from "react"
import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import EmailIcon from '@mui/icons-material/Email';
import { NavLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import zIndex from "@mui/material/styles/zIndex";

const theme = createTheme({
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
        h6: {
            color:"red"
        }
    }
});


const styles = {
    marginTop: "30px",
    minHeight: "130px",
    background: "-webkit-linear-gradient(left,#092224, #181818, #092224)",
    zIndex: theme.zIndex.drawer + 1
}

function Footer() {
    return (
        <footer style={styles}>
            <ThemeProvider theme={theme}>
                <Box sx={{pt:4}}>
                    <Container maxWidth="xl">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <center>
                                <Typography variant="subtitle1" sx={{color: "white"}}>
                                Copyright
                                </Typography>
                                </center>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        </footer>
    )
}

export default Footer