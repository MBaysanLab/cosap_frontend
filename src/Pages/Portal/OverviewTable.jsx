import React from "react";
import Depth from "../../Components/Graph/Depth";
import AlleleFrequency from "../../Components/Graph/AlleleFrequency";
import VariantDetails from "./VariantDetails";
import { Box, Grid, Typography } from "@mui/material";
import { Divider } from "@mui/material";

function OverviewTable(props) {
  const [variant, setVariant] = React.useState(null);

  React.useEffect(() => {
    setVariant(props.variant);
  }, [props.variant]);

  return (
    <Grid
      container
      spacing={1}
      sx={{
        background: "linear-gradient(45deg, #F2F2F2, #D9D9D9)",
        borderRadius: 3,
      }}
    >
      {variant ? (
        <>
          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography color="#6D6D6D">Variant Summary</Typography>
              <Depth value={variant.depth ? variant.depth : null} />
              <Divider
                orientation="horizontal"
                flexItem
                color="black"
                sx={{
                  margin: 1,
                }}
              />
              <AlleleFrequency
                value={variant ? variant.af : null}
                title="VAF"
              />
            </Box>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderRightWidth: 1, background: "black", m: 1 }}
          />
          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography color="#6D6D6D">Allele Frequencies</Typography>
              <AlleleFrequency
                value={variant.user_af ? variant.user_af : null}
                title="User"
              />
              <Divider
                orientation="horizontal"
                flexItem
                sx={{
                  margin: 1,
                }}
              />
              <AlleleFrequency
                value={variant.gnomad_af ? variant.gnomad_af : null}
                title="GNOMAD"
              />
            </Box>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderRightWidth: 1, background: "black", m: 1 }}
          />
          <Grid item xs={5}>
            <VariantDetails title="Variant ID" variant={variant} />
          </Grid>
        </>
      ) : (
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            width: "100%",
          }}
        >
          <Typography>Please Select Variant to View Details</Typography>
        </Box>
      )}
    </Grid>
  );
}

export default OverviewTable;
