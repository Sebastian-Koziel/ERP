import { OperationHandler } from "../Interfaces/operationHandler.interface";


export const fetchOperationHandlersByStage = async (stage_id: string): Promise<OperationHandler[]> => {
    console.log(`tryig to fetch`)
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/operation-handlers/byStage/"+ stage_id, {
      headers: {
        Authorization: "Bearer "+token
      }
    });

    if(!response.ok) {
      throw { message: 'Something went wrong with fetchin operation handlers', status: 500}
    }

    const data = await response.json();
    return data;
  };