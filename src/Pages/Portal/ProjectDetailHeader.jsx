import * as React from "react";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import GroupsIcon from "@mui/icons-material/Groups";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import PendingIcon from "@mui/icons-material/Pending";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ProjectDetailHeaderItem from "./ProjectDetailHeaderItem";
import { Complete, FileUpload, Ongoing } from "./StatusIcons";

const renderStatus = (params) => {
  if (typeof params == "undefined") {
    return <CircularProgress />;
  }
  switch (params[0]) {
    case "completed":
      return <Complete />;
    case "file_upload":
      return <FileUpload value={Number(params[1])} />;
    case "ongoing":
      return <Ongoing value={Number(params[1])} />;
  }
};

function ProjectDetailHeader(props) {
  const data = props.data;

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
        icon={<PendingIcon />}
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
        content={data.time}
      />
    </Paper>
  );
}
export default ProjectDetailHeader;
