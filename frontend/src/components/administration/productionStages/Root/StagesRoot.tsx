import { Outlet, Navigate } from "react-router-dom";
import { hasAccessToStages } from "../../../../services/auth";

function StagesRoot() {
  return (
    <>
      {!hasAccessToStages() && <Navigate to="/administration" />}


      <Outlet />
    </>
  );
}

export default StagesRoot;
