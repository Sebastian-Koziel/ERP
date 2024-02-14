import { OperationHandler } from "../../Production/Interfaces/operationHandler.interface";
import { fetchAllOperationHandlers } from "../../Production/Utils/fectchAllOperationHandlers";
import { fetchAllWorkspaceTypes } from "../../workspaceTypes/Utils/fetchAllWorkspaceTypes";
import { Workspace } from "../../workspaces/Interfaces/Workspace.interface";
import { fetchAllWorkspaces } from "../../workspaces/Utils/fetchAllWorkspaces";

export interface FetchError {
    error: string;
  }

export interface planMainPageConsolidatedData {
    operationHandlers: OperationHandler[] | FetchError;
    workspaces: Workspace[] | FetchError;
  }
  
  export const planMainPageLoader = async (): Promise<planMainPageConsolidatedData | FetchError> => {
    
    try {
      const operationHandlersPromise = fetchAllOperationHandlers();
      const workspacesPromise = fetchAllWorkspaces();
      
      // Add more resource URLs as needed
  
      const [operationHandlers, workspaces] = await Promise.all([operationHandlersPromise, workspacesPromise]);
      
      // Consolidate the data
      const consolidatedData: planMainPageConsolidatedData = {
        operationHandlers,
        workspaces,
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