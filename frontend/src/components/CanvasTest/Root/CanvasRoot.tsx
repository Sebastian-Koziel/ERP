import { Navigate } from "react-router-dom";
import { isLogged } from "../../../services/auth";
import CanvasHandler from "../Canvas/CanvasHandler";
import TopBar from "../../administration/topbar/TopBar";


function CanvasRoot() {


console.log(Date.now())


//stages states

  return (
      <>
      <div>
       {!isLogged() && <Navigate to="/" />}
       <TopBar/>
        <CanvasHandler />
      </div>
      </>
    );
}

export default CanvasRoot;

