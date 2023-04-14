import { Outlet } from "react-router-dom"
import AdministrationMainNav from "../mainNav/AdministrationMainNav"
import "./AdministrationRoot.css"


function AdministrationRoot() {
  

  return (
    <>
      <div className="container">
        <AdministrationMainNav />
          
        <Outlet />
        
      </div>
       
    </>
  )
}

export default AdministrationRoot