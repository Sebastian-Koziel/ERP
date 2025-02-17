import { storageGetToken } from "../../../../utils/localhostHandlers";
import { Workspace } from "../Interfaces/Workspace.interface";

interface FetchError {
  error: string;
}

export const fetchWorkSpaceById = async (workspace_id: string): Promise<Workspace | FetchError> => {
    const token = storageGetToken();
try{
    const response = await fetch("http://localhost:3000/workspaces/" +workspace_id, {
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