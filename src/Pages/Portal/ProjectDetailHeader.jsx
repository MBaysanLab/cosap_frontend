import * as React from "react";
import Paper from "@mui/material/Paper";
import GroupsIcon from "@mui/icons-material/Groups";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ProjectDetailHeaderItem from "./ProjectDetailHeaderItem";

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
        p: 1,
        background: "linear-gradient(45deg, #F2F2F2, #D9D9D9)",
        borderRadius: 3,
      }}
    >
      <ProjectDetailHeaderItem
        icon={<ScatterPlotIcon />}
        title="Project"
        content={data.name}
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
