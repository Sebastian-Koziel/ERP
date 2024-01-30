
import { WorkspaceType } from "../../workspaceTypes/Interfaces/WorkspaceType";
import { fetchAllWorkspaceTypes } from "../../workspaceTypes/Utils/fetchAllWorkspaceTypes";

interface MyLoaderProps {
  workspaceId: string;
}

export interface FetchError {
    error: string;
  }

export interface newOperationConsolidatedData {
    workspaceTypes: WorkspaceType[] | FetchError;
    
  }
  
  export const newProductLoader = async ({params}: {params: MyLoaderProps}): Promise<newOperationConsolidatedData | FetchError> => {
    
    try {
      const workspaceTypesPromise = fetchAllWorkspaceTypes();
      
      
      // Add more resource URLs as needed
  
      const [workspaceTypes] = await Promise.all([workspaceTypesPromise]);
      
      // Consolidate the data
      const consolidatedData: newOperationConsolidatedData = {
        workspaceTypes
        
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