import * as React from "react";

import AssessmentIcon from "@mui/icons-material/Assessment";
import { Route, Routes } from "react-router-dom";
import ProjectsMenu from "../ProjectMenu";
import ProjectList from "../ProjectList";
import Dashboard from "../Dashboard";
import CreateProject from "../CreateProject";
import ProjectDetail from "../ProjectDetail";
import PortalTabs from "../PortalTabs";
import ChangePassword from "../../Auth/ChangePasswordForm";

const menuPages = {
  Dashboard: <Dashboard />,
  Projects: <ProjectsMenu />,
  Reports: <AssessmentIcon />,
};

function PortalRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PortalTabs />}>
        <Route index element={menuPages["Dashboard"]} />
        <Route path="projects" element={menuPages["Projects"]}>
          <Route index element={<ProjectList />} />
          <Route path="create_project" element={<CreateProject />} />
          <Route path=":id" element={<ProjectDetail />} />
        </Route>
        <Route path="reports" element={menuPages["Reports"]} />
        <Route path="change_password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}
export default PortalRoutes;
