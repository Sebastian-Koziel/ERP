import { storageGetToken } from "../../../../utils/localhostHandlers";
import { Operation } from "../Interfaces/Operations.interface";


interface FetchError {
  error: string;
}

export const fetchOperationById = async (operationId: string): Promise<Operation | FetchError> => {
    const token = storageGetToken();
try{
    const response = await fetch("http://localhost:3000/operations/" +operationId, {
      headers: {
        Authorization: "Bearer "+token
      }
    });

    if(!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'Something went wrong with fetching operation';
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