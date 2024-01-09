import { Outlet, Navigate } from "react-router-dom";
import UserListNav from "../ListNav/UserListNav";
import { hasAccessToUsers } from "../../../../services/auth";

function UsersRoot() {
  return (
    <>
      {/*!hasAccessToUsers() && <Navigate to="/administration" />*/}

      <UserListNav />

      <Outlet />
    </>
  );
}

export default UsersRoot;
