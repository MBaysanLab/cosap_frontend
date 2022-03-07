import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import ProjectList from "./ProjectList";
import CreateProject from "./CreateProject";

const pages = {
  projectList: <ProjectList />,
  craeteProject: <CreateProject />,
};

function ProjectDash() {
  const [activePage, setActive] = React.useState(pages["projectList"]);
  const [isCreateActice, setCreateActive] = React.useState(true);

  const handleCreateClick = () => {
    setActive(pages["craeteProject"]);
    setCreateActive(false);
  };

  return (
    <Card raised sx={{ p: { xs: 1, md: 3 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
        <Box sx={{ width: 100 }}>
          <Typography variant="h5">Projects</Typography>
        </Box>
        {isCreateActice && (
          <Button
            variant="text"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Create New Project
          </Button>
        )}
      </Box>
      <Divider sx={{ mb: 3 }} />
      {activePage}
    </Card>
  );
}
export default ProjectDash;
