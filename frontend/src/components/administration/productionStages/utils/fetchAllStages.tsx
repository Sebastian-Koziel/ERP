import { storageGetToken } from "../../../../utils/localhostHandlers";
import { Stage } from "../interfaces/Stage.interface";

interface FetchError {
  error: string;
}

export const fetchAllStages = async (): Promise<Stage[] | FetchError> => {
   
    const token = storageGetToken();
    try{
    const response = await fetch("http://localhost:3000/stages", {
      headers: {
        Authorization: "Bearer "+token
      }
    });

    if(!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'Something went wrong with fetching stages';
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