import { OperationHandler } from "../../administration/Production/Interfaces/operationHandler.interface";
import { fetchOperationHandlersById } from "../../administration/Production/Utils/fetchOperationHandlerById";


interface FetchError {
    error: string;
  }

export interface operationHandlerDetailsConsolidatedData {
    operationHandler: OperationHandler | FetchError;
    
    
  }
  
  export const operationHandlerDetailsLoader = async ({params}: any): Promise<operationHandlerDetailsConsolidatedData | FetchError> => {
    const _id = params.operationHandlerId;

    try {
      const operationHandlerPromise = fetchOperationHandlersById(_id);
      
      
      
      // Add more resource URLs as needed
  
      const [operationHandler] = await Promise.all([operationHandlerPromise]);
      
      // Consolidate the data
      const consolidatedData: operationHandlerDetailsConsolidatedData = {
        operationHandler
      };
  
      return consolidatedData;
    } catch (error) {
      // Handle network and other errors
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "An unexpected error occurred" };
    }
  };