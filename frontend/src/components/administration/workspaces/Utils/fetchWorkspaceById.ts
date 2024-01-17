import { storageGetToken } from "../../../../utils/localhostHandlers";
import { Workspace } from "../Interfaces/Workspace.interface";


interface MyLoaderProps {
  stageId?: number | string;
}

interface FetchError {
  error: string;
}

export const fetchWorkSpaceById = async ({stageId, params}: {stageId?: number | string;params?: MyLoaderProps;}): Promise<Workspace | FetchError> => {
  const workspace_id = stageId || (params && params.stageId);

  if (workspace_id === undefined) {
    return { error: "Stage ID is missing" };
  }

    const token = storageGetToken();
try{
    const response = await fetch("http://localhost:3000/stages/" +workspace_id, {
      headers: {
        Authorization: "Bearer "+token
      }
    });

    if(!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'Something went wrong with fetching workspace';
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data; 
  }catch(error){
    // Handle network and other errors
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }

  };