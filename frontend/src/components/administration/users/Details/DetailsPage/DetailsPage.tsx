import { Outlet } from "react-router-dom"
import UserDetailsNav from "../DetailsNav/DetailsNav"

function UsersDetailsRoot() {

  

  return (
    <>
        <UserDetailsNav />
        
        <Outlet />
    </>
  )
}

export default UsersDetailsRoot

