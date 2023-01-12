import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function Footer() {
  const styles = {
    minHeight: "130px",
    background: "#ffffff",
    marginLeft: "0",
  };
  const year = new Date().getFullYear();

  return (
    <footer style={styles}>
      <Box sx={{ pt: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <center>
                <Typography variant="subtitle1" sx={{ color: "black" }}>
                  CosapSEQ&copy; {year}
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
