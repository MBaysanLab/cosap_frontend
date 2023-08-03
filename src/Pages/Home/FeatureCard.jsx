import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function FeatureCard(props) {
  return (
    <Card
      sx={{
        margin: { xs: 0, sm: 1, md: 3 },
        marginLeft: { xs: 1 },
        marginRight: { xs: 1 },
        borderRadius: 5,
        backgroundImage: props.bgImage,
        justifyContent: "space-between",
      }}
    >
      <CardContent
        sx={{
          minHeight: { xs: "200px", md: "350px" },
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
          {props.header}
        </Typography>
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontSize: { xs: 15, md: "1.2em" },
          }}
        >
          {props.children}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FeatureCard;
