import { Outlet, Navigate } from "react-router-dom";

import { hasAccessToUsers } from "../../../../services/auth";



function ProductsRoot() {
  return (
    <>
      {!hasAccessToUsers() && <Navigate to="/administration" />}

      <Outlet />
    </>
  );
}

export default ProductsRoot;