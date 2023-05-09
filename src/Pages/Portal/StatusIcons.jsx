import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export function Complete() {
  return (
    <Box
      sx={{
        p: "5px",
        backgroundColor: "white",
        borderRadius: "155px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CheckCircleOutlineOutlinedIcon htmlColor="green" />
      <Typography variant="body" sx={{ display: "inline", fontSize: 15 }}>
        View Results
      </Typography>
    </Box>
  );
}

export function Pending() {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <HourglassEmptyIcon htmlColor="#b7b02c" />
      <Typography
        variant="body"
        sx={{ pl: 1, display: "inline", fontSize: 15 }}
      >
        Pending
      </Typography>
    </Box>
  );
}

export function InProgress(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress color="progress" size={20} />
      <Typography
        variant="body"
        sx={{ pl: 1, display: "inline", fontSize: 15 }}
      >
        Running
      </Typography>
    </Box>
  );
}

export function Failed() {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <ErrorOutlineIcon htmlColor="red" />
      <Typography
        variant="body"
        sx={{ pl: 1, display: "inline", fontSize: 15 }}
      >
        Failed
      </Typography>
    </Box>
  );
}

export function FileUpload(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <Box sx={{ width: 100, mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={props.value}
            color="progress"
            sx={{
              height: "20px",
            }}
          />
        </Box>
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 5,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.primary">
            Uploading Files
          </Typography>
        </Box>
      </Box>
      <Box sx={{ minWidth: 30 }}>
        <Typography variant="caption" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
