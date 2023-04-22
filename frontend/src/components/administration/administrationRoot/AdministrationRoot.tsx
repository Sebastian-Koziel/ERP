import { Outlet } from "react-router-dom"
import AdministrationMainNav from "../mainNav/AdministrationMainNav"
import "./AdministrationRoot.css"
import TopBar from "../topbar/TopBar"

function AdministrationRoot() {
  

  return (
    <>
    <TopBar />
      <div className="container">
        
        <AdministrationMainNav />
          
        <Outlet />
        
      </div>
       
    </>
  )
}

export default AdministrationRoot