import { OperationHandler } from "../Interfaces/operationHandler.interface";


export const fetchOperationHandlersById = async (operationHandlerId: string): Promise<OperationHandler> => {
    console.log(`tryig to fetch`)
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/operation-handlers/" + operationHandlerId, {
      headers: {
        Authorization: "Bearer "+token
      }
    });

    if(!response.ok) {
      throw { message: `Something went wrong with fetchin operation handler ${operationHandlerId}`, status: 500}
    }

    const data = await response.json();
    return data;
  };