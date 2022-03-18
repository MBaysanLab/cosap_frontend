import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function FeatureCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={props.media} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.header}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {props.children}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FeatureCard;
