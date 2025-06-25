import React from "react";
import { Box, Link, Typography } from "@mui/material";
import PropTypes from "prop-types";

const AlleleFrequenciesCard = ({ variant, cardColors, dataRowStyle, cardStyle }) => {
  return (
    <Box sx={cardStyle(cardColors.gnomad)}>
      <Box
        sx={{
          bgcolor: cardColors.gnomad.header,
          p: 1,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <Typography
          color={cardColors.gnomad.headerText}
          variant="subtitle2"
          fontWeight="bold"
          align="center"
        >
          Allele Frequencies
        </Typography>
      </Box>
      <Box sx={dataRowStyle}>
        <Typography variant="body2" color="#555555" fontWeight="medium">
          Sample Variant AF:
        </Typography>
        <Typography variant="body2" color="#111111" fontWeight="bold">
          {variant.sample_specific.allele_frequency || "0"}
        </Typography>
      </Box>

      <Box sx={{ mt: 0.5 }}>
        <Box sx={{ px: 2, py: 0.5, backgroundColor: "#edf7ed" }}>
          <Typography
            variant="body2"
            color="#1b5e20"
            fontWeight="medium"
            align="center"
          >
            Turkish Genome Database
          </Typography>
        </Box>
        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            TGD AF:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.tgd_af || "0"}
          </Typography>
        </Box>

        <Box
          sx={{
            px: 2,
            py: 0.5,
            backgroundColor: "#e3f2fd",
            mt: 1,
            textAlign: "center",
          }}
        >
          <Link
            href={`https://gnomad.broadinstitute.org/variant/${variant.variant.chrom}-${variant.variant.pos}-${variant.variant.ref}-${variant.variant.alt}?dataset=gnomad_r4`}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              mr: 1,
              color: "#1565c0",
              fontSize: "0.8rem",
            }}
          >
            GNOMAD Genomes
          </Link>
        </Box>
        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            Global:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.gnomadg_af || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            AFR:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.gnomadg_afr_af || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            AMR:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.gnomadg_amr_af || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            AMI:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.gnomadg_ami_af || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            ASJ:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.gnomadg_asj_af || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            EAS:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.gnomadg_eas_af || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            FIN:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.gnomadg_fin_af || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            NFE:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.gnomadg_nfe_af || "0"}
          </Typography>
        </Box>

        <Box sx={dataRowStyle}>
          <Typography variant="body2" color="#555555" fontWeight="medium">
            SAS:
          </Typography>
          <Typography variant="body2" color="#111111" fontWeight="bold">
            {variant.gnomadg_sas_af || "0"}
          </Typography>
        </Box>

        {variant.gnomad_other_frequencies && (
          <Box sx={dataRowStyle}>
            <Typography variant="body2" color="#555555" fontWeight="medium">
              Other:
            </Typography>
            <Typography variant="body2" color="#111111" fontWeight="bold">
              {variant.gnomad_other_frequencies}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

AlleleFrequenciesCard.propTypes = {
  variant: PropTypes.object.isRequired,
  cardColors: PropTypes.object.isRequired,
  dataRowStyle: PropTypes.object.isRequired,
  cardStyle: PropTypes.func.isRequired,
};

export default React.memo(AlleleFrequenciesCard);
