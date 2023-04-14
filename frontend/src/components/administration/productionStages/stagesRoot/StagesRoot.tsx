import { Outlet } from "react-router-dom"
import StagesNav from "../stagesNav/StagesNav"



function StagesRoot() {
  

  return (
    <>
        <StagesNav />
        
        <Outlet />
    </>
  )
}

export default StagesRoot