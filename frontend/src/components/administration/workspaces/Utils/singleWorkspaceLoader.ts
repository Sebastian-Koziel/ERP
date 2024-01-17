import { storageGetToken } from "../../../../utils/localhostHandlers";
import { fetchAllWorkspacesTypes } from "../../../WorkspaceTypes/utils/fetchAllWorkspacesTypes";
import { Stage } from "../../productionStages/interfaces/Stage.interface";
import { fetchAllStages } from "../../productionStages/utils/fetchAllStages";
import { Workspace } from "../Interfaces/Workspace.interface";
import { WorkspaceType } from "../Types/Interfaces/WorkspaceType";

interface FetchError {
    error: string;
  }

interface ConsolidatedData {
    stages: Stage[];
    workspaceTypes: WorkspaceType[];
    workspace: Workspace;
    // Add more properties as needed
  }
  
  export const singleWorkspaceLoader = async (): Promise<ConsolidatedData | FetchError> => {
    const token = storageGetToken();
  
    try {
      const stagesPromise = fetchAllStages();
      const workspaceTypesPromise = fetchAllWorkspacesTypes();
      // Add more resource URLs as needed
  
      const [stages, workspaceTypes, workspace] = await Promise.all([stagesPromise, workspaceTypesPromise, workspacePromise ]);
      
      // Consolidate the data as needed
      const consolidatedData: ConsolidatedData = {
        stages,
        workspaceTypes,
        workspace
        // Add more properties as needed
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