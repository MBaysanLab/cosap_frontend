import * as React from "react";
import { Button, Typography } from "@mui/material";
import { GITHUB_URL } from "../config";
import GithubLogo from "../assets/images/github-mark.png";

function GithubButton(props) {
  const handleClick = () => {
    window.open(GITHUB_URL, "_blank");
  };
  return (
    <Button
      onClick={handleClick}
      sx={{
        my: 2,
        color: "black",
        display: "flex",
        ":hover": {
          bgcolor: "#DCD9D4",
        },
      }}
    >
      <Typography
        component="div"
        color="black"
        sx={{
          whiteSpace: "nowrap",
          fontSize: 12,
          marginRight: 1,
        }}
      >
        View on Github
      </Typography>
      <img src={GithubLogo} alt="Github Logo" width={25} height={25} />
    </Button>
  );
}

export default GithubButton;
