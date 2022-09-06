import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function Footer() {
  const isSmallScreen = window.innerWidth < 900;
  const styles = {
    minHeight: "130px",
    background: "-webkit-linear-gradient(left,#092224, #181818, #092224)",
    marginLeft: isSmallScreen ? "0" : "240px",
  };

  return (
    <footer style={styles}>
      <Box sx={{ pt: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <center>
                <Typography variant="subtitle1" sx={{ color: "white" }}>
                  Copyright
                </Typography>
              </center>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
