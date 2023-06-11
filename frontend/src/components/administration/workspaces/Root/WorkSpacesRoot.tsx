import { Outlet, Navigate } from "react-router-dom";

import { hasAccessToUsers } from "../../../../services/auth";



function WorkspaceRoot() {
  return (
    <>
      {!hasAccessToUsers() && <Navigate to="/administration" />}

      <Outlet />
    </>
  );
}

export default WorkspaceRoot;