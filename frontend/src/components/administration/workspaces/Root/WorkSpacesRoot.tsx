import { Outlet, Navigate } from "react-router-dom";

import { hasAccessToUsers } from "../../../../services/auth";
import WorkSpacesNav from "../WorkSpacesNav/WorkSpacesNav";



function WorkspaceRoot() {
  return (
    <>
      {!hasAccessToUsers() && <Navigate to="/administration" />}

      <WorkSpacesNav />

      <Outlet />
    </>
  );
}

export default WorkspaceRoot;