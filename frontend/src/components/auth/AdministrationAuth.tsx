import { Outlet, Navigate } from "react-router-dom"
import { tokenAndAccesLoader } from "../../services/auth";

function AdministrationAuth() {
  const token = tokenAndAccesLoader();

    return (
    //if user is not logged in - send to login page  
    token ? <Outlet /> : <Navigate to="/"/>  

    //if user logged in but do not have access - send him to his home page TO DO 
    
    )
  }
   export default AdministrationAuth