import * as React from "react";
import Card from "@mui/material/Card";
import { Outlet } from "react-router-dom";

function ProjectMenu() {
  return (
    <Card raised sx={{ p: { xs: 1, md: 3 } }}>
      <Outlet />
    </Card>
  );
}
export default ProjectMenu;
