import { Outlet, Navigate } from "react-router-dom";

import { hasAccessToUsers } from "../../../../services/auth";



function OrdersRoot() {
  return (
    <>
      {!hasAccessToUsers() && <Navigate to="/administration" />}

      <Outlet />
    </>
  );
}

export default OrdersRoot;