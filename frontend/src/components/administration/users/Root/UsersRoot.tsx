import { Outlet } from "react-router-dom"
import UserListNav from "../ListNav/UserListNav"



function UsersRoot() {
  return (
    <>
        <UserListNav />
        
        <Outlet />
    </>
  )
}

export default UsersRoot