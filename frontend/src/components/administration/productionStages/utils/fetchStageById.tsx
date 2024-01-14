import { storageGetToken } from "../../../../utils/localhostHandlers";
import { Stage } from "../interfaces/Stage.interface";

interface MyLoaderProps {
  stageId: number | string;
}

interface FetchError {
  error: string;
}

export const fetchStageById = async ({params}: {params: MyLoaderProps;}): Promise<Stage | FetchError> => {
    const stage_id = params.stageId;

    const token = storageGetToken();
try{
    const response = await fetch("http://localhost:3000/stages/" +stage_id, {
      headers: {
        Authorization: "Bearer "+token
      }
    });

    if(!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'Something went wrong with fetching stage';
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