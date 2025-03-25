import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function FeatureCard({ header, children }) {
  return (
    <Card
      sx={{
        margin: { xs: 0, sm: 1, md: 3 },
        marginLeft: { xs: 1 },
        marginRight: { xs: 1 },
        borderRadius: 5,
        backgroundColor: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "none",
        justifyContent: "space-between",
      }}
    >
      <CardContent
        sx={{
          minHeight: { xs: "200px", md: "250px" },
          minWidth: { xs: "250px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          padding: { xs: 3, md: 5 },
        }}
      >
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          color="white"
          sx={{
            fontSize: { xs: 25, md: "3em" },
          }}
        >
          {header}
        </Typography>
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontSize: { xs: 15, md: "1.2em" },
          }}
        >
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FeatureCard;
