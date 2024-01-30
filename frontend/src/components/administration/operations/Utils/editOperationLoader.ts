
import { WorkspaceType } from "../../workspaceTypes/Interfaces/WorkspaceType";
import { fetchAllWorkspaceTypes } from "../../workspaceTypes/Utils/fetchAllWorkspaceTypes";
import { Operation } from "../Interfaces/Operations.interface";
import { fetchOperationById } from "./fetchOperationById";

interface MyLoaderProps {
    operationId: string;
}

export interface FetchError {
    error: string;
  }

export interface editperationConsolidatedData {
    workspaceTypes: WorkspaceType[] | FetchError;
    operation: Operation | FetchError
    
  }
  
  export const editOperationLoader = async ({params}: {params: MyLoaderProps}): Promise<editperationConsolidatedData | FetchError> => {
    const _id = params.operationId;

    try {
      const workspaceTypesPromise = fetchAllWorkspaceTypes();
      const operationPromise = fetchOperationById(_id);
      
      
      // Add more resource URLs as needed
  
      const [workspaceTypes, operation] = await Promise.all([workspaceTypesPromise, operationPromise]);
      
      // Consolidate the data
      const consolidatedData: editperationConsolidatedData = {
        workspaceTypes,
        operation
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