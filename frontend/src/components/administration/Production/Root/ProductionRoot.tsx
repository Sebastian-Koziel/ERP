import { Outlet, Navigate } from "react-router-dom";

import { hasAccessToUsers } from "../../../../services/auth";




function ProductionRoot() {
  return (
    <>
      {!hasAccessToUsers() && <Navigate to="/administration" />}

      <Outlet />
    </>
  );
}

export default ProductionRoot;