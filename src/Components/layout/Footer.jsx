import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function Footer() {
  const styles = {
    minHeight: "100px",
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
                <Link href="/" variant="subtitle1" sx={{ color: "black" }}>
                  CosapSEQ&copy; {year}
                </Link>
              </center>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
