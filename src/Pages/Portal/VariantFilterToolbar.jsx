import * as React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function FilterToolbar({ onFilterApply, onClearFilters, filterModel }) {
  return (
    <Box sx={{ mb: 2, width: "85vw" }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        {/* Scrollable filters section with fade-out indicator */}
        <Box
          sx={{
            position: "relative",
            flex: 1,
            overflow: "hidden", // Hide the scrollbar
            pr: 2, // Add padding to the right to prevent text cutoff
          }}
        >
          {/* Fade-out overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "50px",
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
              pointerEvents: "none", // Ensure the overlay doesn't block interactions
              zIndex: 1,
            }}
          />
          {/* Scrollable content */}
          <Box
            sx={{
              display: "flex",
              overflow: "auto",
              whiteSpace: "nowrap",
              gap: 2,
              scrollbarWidth: "thin", // For better scrollbar styling
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "3px",
              },
            }}
          >
            {filterModel
              .filter((c) => c.type === "button")
              .map((category) => (
                <Box key={category.label}>
                  {/* Group label */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      mb: 0.5,
                      pl: 0.5,
                      fontSize: "0.7rem",
                      color: "text.secondary",
                    }}
                  >
                    {category.label}
                  </Typography>
                  {/* Filter buttons */}
                  <ButtonGroup variant="outlined" size="small">
                    {category.filters.map((filter) => (
                      <Button
                        key={filter.value}
                        onClick={() =>
                          onFilterApply(
                            filterModel.map((c) =>
                              c.label === category.label
                                ? {
                                    ...c,
                                    filters: c.filters.map((f) =>
                                      f.value === filter.value
                                        ? { ...f, active: !f.active }
                                        : f
                                    ),
                                  }
                                : c
                            )
                          )
                        }
                        sx={{
                          fontSize: "0.7rem",
                          px: 1,
                          color: "#333",
                          borderColor: filter.active ? "#428df5" : "#333",
                          backgroundColor: filter.active
                            ? "#428df5"
                            : "#f5f5f5",
                          minHeight: 30,
                          "&:hover": {
                            backgroundColor: filter.active
                              ? "#428df5"
                              : "#f5f5f5",
                          },
                        }}
                      >
                        {filter.label}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Box>
              ))}

            {filterModel
              .filter((c) => c.type === "input")
              .map((category) => (
                <Box key={category.label}>
                  <TextField
                    label={category.label.replace("_", " ")}
                    size="small"
                    variant="standard"
                    onChange={(e) =>
                      onFilterApply(
                        filterModel.map((c) =>
                          c.label === category.label
                            ? {
                                ...c,
                                filters: c.filters.map((f) => ({
                                  ...f,
                                  value: e.target.value,
                                  active: Boolean(e.target.value),
                                })),
                              }
                            : c
                        )
                      )
                    }
                    sx={{
                      width: 150,
                      "& label.Mui-focused": { color: "#333" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#333" },
                        "&:hover fieldset": { borderColor: "#333" },
                        "&.Mui-focused fieldset": { borderColor: "#333" },
                      },
                    }}
                  />
                </Box>
              ))}
          </Box>
        </Box>

        {/* Non-scrollable actions section */}
        <Box sx={{ flexShrink: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
              fontSize: "0.7rem",
              color: "text.secondary",
            }}
          >
            Actions
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={onClearFilters}
            sx={{
              fontSize: "0.6rem",
              color: "#333",
              borderColor: "#333",
              minHeight: 30,
            }}
          >
            Clear Filters
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default FilterToolbar;
