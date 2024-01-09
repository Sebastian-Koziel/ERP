import { useNavigate, useLoaderData } from "react-router-dom";
import { OperationHandler } from "../../administration/Production/Interfaces/operationHandler.interface";
import { fetchOperationHandlersById } from "../../administration/Production/Utils/fetchOperationHandlerById";
import { postOperationDone } from "../Utils/postOperationDone";
import { useState } from "react";
import Startedjob from "./startedJob/startedJob";


function OperationHandlerDetails() {
    const operationHandler = useLoaderData() as OperationHandler;
    const navigate = useNavigate();

    const [jobStarted, setJobStarted] = useState(false);

    const finishJobHandler = () => {
        try {
            postOperationDone(operationHandler._id, operationHandler.qty);
            goBackHandler();
          } catch (err) {
            return err;
          }
    }

    const startJobButtonHandler = () =>{
      setJobStarted(!jobStarted);
    }


    const goBackHandler = () => {
        navigate("..");
    }

    console.log(operationHandler);
    return (
        <>
        <div>
        <h2>{operationHandler.name}</h2>
        <p>Operation Comment: {}</p>
        <p>Qty to Do: {operationHandler.qty}</p>
        {!jobStarted && <button onClick={startJobButtonHandler}>Start Working</button>}
        {!jobStarted && <button onClick={goBackHandler}>Go Back to List</button>}
        {jobStarted && <Startedjob />}
        </div>
        </>
    )
}

export default OperationHandlerDetails;



export const operationHandlerLoader = async ({params}:{params: any;}): Promise<OperationHandler> => {
  const operationHandlerId = params.operationHandlerId;
  try {
  const response = await fetchOperationHandlersById(operationHandlerId);
  return response;
  } catch(error) {
    throw error;
  }  
};
