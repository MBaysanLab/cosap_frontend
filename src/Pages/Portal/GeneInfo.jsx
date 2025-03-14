import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

function GeneInfo(props) {
  const [geneData, setGeneData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Color palette for different card types - matching OverviewTable
  const cardColors = {
    geneSummary: {
      header: "#4a6da7",
      headerText: "#ffffff",
      border: "#c6d4ea",
    },
    geneLocation: {
      header: "#5b8c5a",
      headerText: "#ffffff",
      border: "#d0e8cf",
    },
    biologicalFunction: {
      header: "#9c6b8c",
      headerText: "#ffffff",
      border: "#e8d0df",
    },
    pathways: {
      header: "#a17c4e",
      headerText: "#ffffff",
      border: "#e8d9c6",
    },
    externalIDs: {
      header: "#3b6793",
      headerText: "#ffffff",
      border: "#c2d5e8",
    },
  };

  // Common style for all card containers - matching OverviewTable
  const cardStyle = (colorSet) => ({
    display: "flex",
    flexDirection: "column",
    p: 0,
    height: "100%",
    border: `1px solid ${colorSet.border}`,
    borderRadius: 2,
    background: "#FFFFFF",
    overflow: "auto",
  });

  // Style for data row pairs (label + value) - matching OverviewTable
  const dataRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 2,
    py: 0.5,
    "&:nth-of-type(even)": {
      backgroundColor: "#f9f9f9",
    },
  };

  useEffect(() => {
    const fetchGeneInfo = async () => {
      // Reset states when gene symbol changes
      setGeneData(null);
      setError(null);

      if (!props.geneSymbol) {
        return;
      }

      setLoading(true);

      try {
        // Using mygene.info API
        const response = await fetch(
          `https://mygene.info/v3/query?q=symbol:${props.geneSymbol}&species=human&fields=name,symbol,genomic_pos,go,pathway,alias,summary,generif.pubmed,type_of_gene,refseq,uniprot,ensembl,pdb,pfam,interpro,homologene,MIM,pharmgkb,reporter,reagent,entrezgene`
        );

        if (!response.ok) {
          throw new Error(`Error fetching gene info: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.hits[0]);

        if (data.hits && data.hits.length > 0) {
          setGeneData(data.hits[0]);
        } else {
          throw new Error(
            `No information found for gene symbol: ${props.geneSymbol}`
          );
        }
      } catch (err) {
        console.error("Failed to fetch gene info:", err);
        setError(err.message || "Failed to fetch gene information");
      } finally {
        setLoading(false);
      }
    };

    fetchGeneInfo();
  }, [props.geneSymbol]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!props.geneSymbol) {
    return (
      <Box
        sx={{ justifyContent: "center", display: "flex", width: "100%", p: 2 }}
      >
        <Typography variant="body2">
          Please select a gene to view its information
        </Typography>
      </Box>
    );
  }

  if (!geneData) {
    return (
      <Box
        sx={{ justifyContent: "center", display: "flex", width: "100%", p: 2 }}
      >
        <Typography variant="body2">Loading gene information...</Typography>
      </Box>
    );
  }

  // Extract genomic position - mygene.info can return array or object
  const genomicPos = geneData.genomic_pos || {};
  const position = Array.isArray(genomicPos) ? genomicPos[0] : genomicPos;

  // Extract GO terms
  const goTerms = {
    molecular_function: [],
    biological_process: [],
    cellular_component: [],
  };

  if (geneData.go) {
    Object.entries(geneData.go).forEach(([category, terms]) => {
      if (Array.isArray(terms)) {
        terms.forEach((term) => {
          if (term.term && category in goTerms) {
            goTerms[category].push(term.term);
          }
        });
      }
    });
  }

  // Get aliases
  const aliases = geneData.alias || [];

  // Add this helper function in your component
  const formatFieldData = (data, limit = 3) => {
    if (!data) return "";
    if (Array.isArray(data)) return data.slice(0, limit).join(", ");
    return data;
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        background: "linear-gradient(45deg, #F2F2F2, #e7e7e7)",
        borderRadius: 3,
        p: 1,
      }}
    >
      {/* Gene Summary */}
      <Grid item xs={12}>
        <Box sx={cardStyle(cardColors.geneSummary)}>
          <Box
            sx={{
              bgcolor: cardColors.geneSummary.header,
              p: 1,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
          >
            <Typography
              color={cardColors.geneSummary.headerText}
              variant="subtitle2"
              fontWeight="bold"
              align="center"
            >
              Gene Summary: {geneData.symbol}{" "}
              {geneData.name && `(${geneData.name})`}
            </Typography>
          </Box>

          <Box sx={{ p: 1.5 }}>
            <Typography variant="body2" paragraph mb={1}>
              {geneData.summary || "No summary available"}
            </Typography>

            <Box sx={dataRowStyle}>
              <Typography variant="body2" color="#555555" fontWeight="medium">
                Gene Type:
              </Typography>
              <Typography variant="body2" color="#111111" fontWeight="bold">
                {geneData.type_of_gene || "Not specified"}
              </Typography>
            </Box>

            {aliases.length > 0 && (
              <>
                <Typography
                  variant="body2"
                  color="#555555"
                  fontWeight="medium"
                  mt={1}
                  mb={0.5}
                >
                  Also known as:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {aliases.map((alias, index) => (
                    <Chip
                      key={index}
                      label={alias}
                      size="small"
                      sx={{
                        height: "20px",
                        fontSize: "0.7rem",
                        backgroundColor: "#f0f0f0",
                      }}
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Grid>

      {/* Gene Location */}
      <Grid item xs={12} md={6}>
        <Box sx={cardStyle(cardColors.geneLocation)}>
          <Box
            sx={{
              bgcolor: cardColors.geneLocation.header,
              p: 1,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
          >
            <Typography
              color={cardColors.geneLocation.headerText}
              variant="subtitle2"
              fontWeight="bold"
              align="center"
            >
              Genomic Location
            </Typography>
          </Box>

          <Box sx={{ mt: 0.5 }}>
            <Box sx={dataRowStyle}>
              <Typography variant="body2" color="#555555" fontWeight="medium">
                Chromosome:
              </Typography>
              <Typography variant="body2" color="#111111" fontWeight="bold">
                {position.chr || "Unknown"}
              </Typography>
            </Box>

            <Box sx={dataRowStyle}>
              <Typography variant="body2" color="#555555" fontWeight="medium">
                Start Position:
              </Typography>
              <Typography variant="body2" color="#111111" fontWeight="bold">
                {position.start?.toLocaleString() || "Unknown"}
              </Typography>
            </Box>

            <Box sx={dataRowStyle}>
              <Typography variant="body2" color="#555555" fontWeight="medium">
                End Position:
              </Typography>
              <Typography variant="body2" color="#111111" fontWeight="bold">
                {position.end?.toLocaleString() || "Unknown"}
              </Typography>
            </Box>

            <Box sx={dataRowStyle}>
              <Typography variant="body2" color="#555555" fontWeight="medium">
                Strand:
              </Typography>
              <Typography variant="body2" color="#111111" fontWeight="bold">
                {position.strand || "Unknown"}
              </Typography>
            </Box>

            <Box sx={dataRowStyle}>
              <Typography variant="body2" color="#555555" fontWeight="medium">
                Entrez Gene ID:
              </Typography>
              <Typography variant="body2" color="#111111" fontWeight="bold">
                {geneData.entrezgene || "Unknown"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Biological Function */}
      <Grid item xs={12} md={6}>
        <Box sx={cardStyle(cardColors.biologicalFunction)}>
          <Box
            sx={{
              bgcolor: cardColors.biologicalFunction.header,
              p: 1,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
          >
            <Typography
              color={cardColors.biologicalFunction.headerText}
              variant="subtitle2"
              fontWeight="bold"
              align="center"
            >
              Biological Function
            </Typography>
          </Box>

          <Box sx={{ p: 1 }}>
            <Typography
              variant="body2"
              color="#555555"
              fontWeight="medium"
              mb={0.5}
            >
              Molecular Function:
            </Typography>
            {goTerms.molecular_function.length > 0 ? (
              <Box sx={{ mb: 1 }}>
                {goTerms.molecular_function.slice(0, 5).map((term, index) => (
                  <Chip
                    key={index}
                    label={term}
                    size="small"
                    sx={{
                      m: 0.25,
                      height: "20px",
                      fontSize: "0.7rem",
                      backgroundColor: "#e3f2fd",
                      color: "#1976d2",
                    }}
                  />
                ))}
                {goTerms.molecular_function.length > 5 && (
                  <Typography
                    variant="body2"
                    color="#777777"
                    fontSize="0.7rem"
                    mt={0.5}
                  >
                    +{goTerms.molecular_function.length - 5} more functions
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography variant="body2" fontSize="0.8rem" color="#666666">
                No molecular function data available
              </Typography>
            )}

            <Divider sx={{ my: 0.5 }} />

            <Typography
              variant="body2"
              color="#555555"
              fontWeight="medium"
              mb={0.5}
              mt={0.5}
            >
              Biological Process:
            </Typography>
            {goTerms.biological_process.length > 0 ? (
              <Box sx={{ mb: 1 }}>
                {goTerms.biological_process.slice(0, 5).map((term, index) => (
                  <Chip
                    key={index}
                    label={term}
                    size="small"
                    sx={{
                      m: 0.25,
                      height: "20px",
                      fontSize: "0.7rem",
                      backgroundColor: "#e8f5e9",
                      color: "#2e7d32",
                    }}
                  />
                ))}
                {goTerms.biological_process.length > 5 && (
                  <Typography
                    variant="body2"
                    color="#777777"
                    fontSize="0.7rem"
                    mt={0.5}
                  >
                    +{goTerms.biological_process.length - 5} more processes
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography variant="body2" fontSize="0.8rem" color="#666666">
                No biological process data available
              </Typography>
            )}

            <Divider sx={{ my: 0.5 }} />

            <Typography
              variant="body2"
              color="#555555"
              fontWeight="medium"
              mb={0.5}
              mt={0.5}
            >
              Cellular Component:
            </Typography>
            {goTerms.cellular_component.length > 0 ? (
              <Box>
                {goTerms.cellular_component.slice(0, 5).map((term, index) => (
                  <Chip
                    key={index}
                    label={term}
                    size="small"
                    sx={{
                      m: 0.25,
                      height: "20px",
                      fontSize: "0.7rem",
                      backgroundColor: "#e3f2fd",
                      color: "#0277bd",
                    }}
                  />
                ))}
                {goTerms.cellular_component.length > 5 && (
                  <Typography
                    variant="body2"
                    color="#777777"
                    fontSize="0.7rem"
                    mt={0.5}
                  >
                    +{goTerms.cellular_component.length - 5} more components
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography variant="body2" fontSize="0.8rem" color="#666666">
                No cellular component data available
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      {/* Pathways */}
      <Grid item xs={12} md={6} sx={{ mt: 1 }}>
        <Box sx={cardStyle(cardColors.pathways)}>
          <Box
            sx={{
              bgcolor: cardColors.pathways.header,
              p: 1,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
          >
            <Typography
              color={cardColors.pathways.headerText}
              variant="subtitle2"
              fontWeight="bold"
              align="center"
            >
              Pathways
            </Typography>
          </Box>

          <Box sx={{ p: 1 }}>
            {geneData.pathway &&
              Object.entries(geneData.pathway).map(([database, pathways]) => (
                <Box key={database} sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                    mb={0.5}
                  >
                    {database.toUpperCase()}:
                  </Typography>
                  {Array.isArray(pathways) ? (
                    pathways.length > 0 ? (
                      <Box sx={{ pl: 1 }}>
                        {pathways.slice(0, 5).map((pathway, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            color="#111111"
                            fontSize="0.8rem"
                          >
                            • {pathway.name}
                          </Typography>
                        ))}
                        {pathways.length > 5 && (
                          <Typography
                            variant="body2"
                            color="#777777"
                            fontSize="0.7rem"
                          >
                            +{pathways.length - 5} more pathways
                          </Typography>
                        )}
                      </Box>
                    ) : (
                      <Typography
                        variant="body2"
                        fontSize="0.8rem"
                        color="#666666"
                      >
                        No pathway data available
                      </Typography>
                    )
                  ) : (
                    <Typography
                      variant="body2"
                      fontSize="0.8rem"
                      color="#666666"
                    >
                      No pathway data available
                    </Typography>
                  )}
                  {Object.entries(geneData.pathway).indexOf([
                    database,
                    pathways,
                  ]) <
                    Object.entries(geneData.pathway).length - 1 && (
                    <Divider sx={{ my: 1 }} />
                  )}
                </Box>
              ))}

            {(!geneData.pathway ||
              Object.keys(geneData.pathway).length === 0) && (
              <Typography variant="body2" fontSize="0.8rem" color="#666666">
                No pathway data available
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      {/* External IDs */}
      <Grid item xs={12} md={6} sx={{ mt: 1 }}>
        <Box sx={cardStyle(cardColors.externalIDs)}>
          <Box
            sx={{
              bgcolor: cardColors.externalIDs.header,
              p: 1,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
          >
            <Typography
              color={cardColors.externalIDs.headerText}
              variant="subtitle2"
              fontWeight="bold"
              align="center"
            >
              External Database IDs
            </Typography>
          </Box>

          <Box sx={{ p: 1 }}>
            {geneData.MIM && (
              <Box sx={dataRowStyle}>
                <Typography variant="body2" color="#555555" fontWeight="medium">
                  OMIM:
                </Typography>
                <Typography variant="body2" color="#111111" fontWeight="bold">
                  {geneData.MIM}
                </Typography>
              </Box>
            )}

            {geneData.uniprot && geneData.uniprot["Swiss-Prot"] && (
              <Box sx={dataRowStyle}>
                <Typography variant="body2" color="#555555" fontWeight="medium">
                  UniProt:
                </Typography>
                <Typography variant="body2" color="#111111" fontWeight="bold">
                  {geneData.uniprot["Swiss-Prot"]}
                </Typography>
              </Box>
            )}

            {geneData.ensembl && geneData.ensembl.gene && (
              <Box sx={dataRowStyle}>
                <Typography variant="body2" color="#555555" fontWeight="medium">
                  Ensembl:
                </Typography>
                <Typography variant="body2" color="#111111" fontWeight="bold">
                  {geneData.ensembl.gene}
                </Typography>
              </Box>
            )}

            {geneData.refseq &&
              geneData.refseq.genomic &&
              geneData.refseq.genomic.length > 0 && (
                <Box sx={dataRowStyle}>
                  <Typography
                    variant="body2"
                    color="#555555"
                    fontWeight="medium"
                  >
                    RefSeq:
                  </Typography>
                  <Typography variant="body2" color="#111111" fontWeight="bold">
                    {geneData.refseq.genomic[0]}
                  </Typography>
                </Box>
              )}

            {geneData.pdb && (
              <Box sx={dataRowStyle}>
                <Typography variant="body2" color="#555555" fontWeight="medium">
                  PDB:
                </Typography>
                <Typography variant="body2" color="#111111" fontWeight="bold">
                  {formatFieldData(geneData.pdb)}
                </Typography>
              </Box>
            )}

            {geneData.pfam && (
              <Box sx={dataRowStyle}>
                <Typography variant="body2" color="#555555" fontWeight="medium">
                  Pfam:
                </Typography>
                <Typography variant="body2" color="#111111" fontWeight="bold">
                  {formatFieldData(geneData.pfam)}
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Link
                href={`https://www.ncbi.nlm.nih.gov/gene/${geneData.entrezgene}`}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  mr: 1,
                  color: "#1565c0",
                  fontSize: "0.8rem",
                }}
              >
                View on NCBI
              </Link>
              {" | "}
              <Link
                href={`https://www.genecards.org/cgi-bin/carddisp.pl?gene=${geneData.symbol}`}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  ml: 1,
                  color: "#1565c0",
                  fontSize: "0.8rem",
                }}
              >
                View on GeneCards
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default GeneInfo;
