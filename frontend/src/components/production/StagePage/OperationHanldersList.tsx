import { useEffect, useState } from "react";
import { fetchOperationHandlersByStage } from "../../administration/Production/Utils/fetchOperationHandlersByStage";
import { Link } from "react-router-dom";
import StagesBar from "./StagesBar";
import { OperationHandler } from "../../administration/Production/Interfaces/operationHandler.interface";
import { fetchAllStages } from "../../administration/productionStages/utils/fetchAllStages";
import { storageGetUser } from "../../../utils/localhostHandlers";

/* TO DO



*/

function OperationHanldersList() {

  //get user info
  const user = storageGetUser();

  const userStages:string[] = user.access.production.stagesAccess;
  
  //get last viewed stage from localhost
  const lastStageString = localStorage.getItem("lastViewedStage")
  const lastStage:number = lastStageString ? parseInt(lastStageString) : 0;

  // State variables
  const [currentStageIndex, setcurrentStageIndex] = useState(lastStage);
  const [stages, setStages] = useState();
  const [operationHandlers, setOperationHandlers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch operation handlers
        const data:any = await fetchOperationHandlersByStage(userStages[currentStageIndex]);
        setOperationHandlers(data);
        //fetch stages
        const data2:any = await fetchAllStages();
        setStages(data2);
        setLoading(false);
      } catch (err:any) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
    
  }, [currentStageIndex]); 

  
  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Error: {error.message}</p>; 
  }

  if (!userStages.length) {
    return <p>You have no assigned role. Please contact your supervisor</p>; 
  }

  return (
      <>
      <StagesBar stages={stages} userStages={userStages} index={currentStageIndex} setIndex={setcurrentStageIndex}/>
      <div>
      {operationHandlers.map((operation:OperationHandler) => (
          <div key={operation._id}>
            <p>Name: {operation.name}</p>
            <p>Quantity: {operation.qty}</p>
            <p>avaiable: {operation.avaiable? 'true': 'false'}</p>
            <button> 
              <Link to={operation._id}>Edit</Link>
            </button>
          </div>
        ))}
      </div>
      </>
    );
}

export default OperationHanldersList;


  


 



 