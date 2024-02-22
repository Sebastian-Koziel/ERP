import { Navigate, Outlet } from "react-router-dom";
import { isLogged } from "../../../services/auth";
import TopBar from "../../administration/topbar/TopBar";
import StagesBar from "../StageTopBar/StagesBar";
import OperationHanldersList from "../ProductionMainPage/ProductionMainPage";
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

