import * as React from "react";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import GroupsIcon from "@mui/icons-material/Groups";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ProjectDetailHeaderItem from "./ProjectDetailHeaderItem";
import { Complete, InProgress } from "./StatusIcons";

const renderStatus = (params) => {
  if (typeof params == "undefined") {
    return <CircularProgress />;
  }
  switch (params) {
    case "CO":
      return <Complete />;
    case "IP":
      return <InProgress />;
  }
};

function ProjectDetailHeader(props) {
  const data = props.data;
  const date = new Date(data.time);
  const dateLocal = date.toLocaleString();

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        p: 3,
      }}
    >
      <ProjectDetailHeaderItem
        icon={<ScatterPlotIcon />}
        title="Project"
        content={data.name}
      />
      <ProjectDetailHeaderItem
        title="Status"
        content={renderStatus(data.status)}
      />
      <ProjectDetailHeaderItem
        icon={<GroupsIcon />}
        title="Collaborators"
        content={data.collaborators}
      />
      <ProjectDetailHeaderItem
        icon={<AccessTimeIcon />}
        title="Created at"
        content={dateLocal}
      />
    </Paper>
  );
}
export default ProjectDetailHeader;
