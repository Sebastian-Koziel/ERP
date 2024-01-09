import { Navigate, Outlet } from "react-router-dom";
import { isLogged } from "../../../services/auth";
import TopBar from "../../administration/topbar/TopBar";
import StagesBar from "../StagePage/StagesBar";
import OperationHanldersList from "../StagePage/OperationHanldersList";
import { useState } from "react";


function ProductionRoot() {

//stages states

  return (
      <>
      <div>
       {!isLogged() && <Navigate to="/" />}
  
        <TopBar />
        
        <Outlet />
        
      </div>
      </>
    );
}

export default ProductionRoot;

