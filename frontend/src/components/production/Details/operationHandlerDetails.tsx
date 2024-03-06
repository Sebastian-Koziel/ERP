import { useLoaderData, useNavigate} from "react-router-dom";
import { OperationHandler } from "../../administration/Production/Interfaces/operationHandler.interface";
import { postOperationDone } from "../Utils/postOperationDone";
import { useState } from "react";
import { startJobData } from "../interfaces/startJobData.interface";
import { updateOperationHandler } from "../Utils/updateOperationHandler";
import { useToast } from "@chakra-ui/react";
import { operationHandlerDetailsConsolidatedData } from "../Utils/operationHandlerDetailsLoader";
import { FetchError } from "../Utils/singleStageLoader";
import FetchErrorComponent from "../../errorHandling/FetchErrorComponent";
import { finishJobData } from "../interfaces/finishJobData.interface";


export const OperationHandlerDetails: React.FC = () => {
    
    const toast = useToast();
    const navigate = useNavigate();

    //handle fetching
  const routeData = useLoaderData() as operationHandlerDetailsConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    
    return <FetchErrorComponent errors={routeData.error} />;
  }
  const { operationHandler } = routeData;
  // Check for errors within consolidated data
  if ('error' in operationHandler) {
    // Handle errors within consolidated data
    const errors = [
      'Error in operationHandler: ' + (operationHandler as FetchError).error,
      
    ];
    return <FetchErrorComponent errors={errors} />;
  }

    const finishJobHandler = () => {
        
    }

const startJobButtonHandler = async () =>{
      //set data
  const data: startJobData = {
    id: operationHandler._id,
    attr : {
      startedAt: Date.now(),
      inProgress: true
    }
  }
  try {
    const response = await updateOperationHandler(data);
    toast({
      title: "Success",
      description: "job started",
      status: "success",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
  } catch (err: any) {
    toast({
      title: "Error.",
      description: err.message || "Something went wrong with starting this job",
      status: "error",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
  }
}

const finishJobButtonHandler = async () =>{
  //set data
const data: finishJobData = {
id: operationHandler._id,
attr : {
  finishedAt: Date.now(),
  inProgress: true
}
}
try {
const response = await updateOperationHandler(data);
toast({
  title: "Success",
  description: "job started",
  status: "success",
  duration: 5000,
  position: 'top',
  isClosable: true
});
} catch (err: any) {
toast({
  title: "Error.",
  description: err.message || "Something went wrong with starting this job",
  status: "error",
  duration: 5000,
  position: 'top',
  isClosable: true
});
}
}

    const goBackHandler = () => {
        navigate("..");
    }

    return (
        <>
        <div>
        <h2>{operationHandler.name}</h2>
        <p>Operation Comment: {}</p>
        <p>Qty to Do: {operationHandler.totalQty}</p>
        <button onClick={startJobButtonHandler}>Start Job</button>
        <button onClick={goBackHandler}>Go Back to List</button>
        </div>
        </>
    )

}


