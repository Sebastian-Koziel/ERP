import { Outlet, Navigate } from "react-router-dom"
import AdministrationMainNav from "../mainNav/AdministrationMainNav"
import "./AdministrationRoot.css"
import TopBar from "../topbar/TopBar"
import { isLogged } from "../../../services/auth"

function AdministrationRoot() {
  

  return (
    <>
    {!isLogged() && <Navigate to="/"/>}

    <TopBar />
      <div className="container">
        
        <AdministrationMainNav />
          
        <Outlet />
        
      </div>
       
    </>
  )
}

export default AdministrationRoot