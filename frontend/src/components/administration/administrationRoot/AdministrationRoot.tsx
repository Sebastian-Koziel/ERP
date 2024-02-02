import { Outlet, useNavigate } from "react-router-dom";
import AdministrationMainNav from "../mainNav/AdministrationMainNav";
import TopBar from "../topbar/TopBar";
import { isLogged } from "../../../services/auth";
import { useEffect } from "react";
import "./AdministrationRoot.css";

function AdministrationRoot() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged()) {
      

        navigate("/");
    }
  }, [navigate, isLogged]);

  
  return (
    <>
      <TopBar />
      <div className="container">
        <AdministrationMainNav />

        <Outlet />
      </div>
    </>
  );
}

export default AdministrationRoot;
