import { Outlet, Navigate } from "react-router-dom"
import StagesNav from "../stagesNav/StagesNav"
import { hasAccessToStages } from "../../../../services/auth"



function StagesRoot() {
  
  
  return (
    <>
    {!hasAccessToStages() && <Navigate to="/administration"/>}

        <StagesNav />
        
        <Outlet />
    </>
  )
  
 
}

export default StagesRoot