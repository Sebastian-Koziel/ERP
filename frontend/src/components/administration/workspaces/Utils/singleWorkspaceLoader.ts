import { Stage } from "../../productionStages/interfaces/Stage.interface";
import { fetchAllStages } from "../../productionStages/utils/fetchAllStages";
import { Workspace } from "../Interfaces/Workspace.interface";
import { WorkspaceType } from "../../workspaceTypes/Interfaces/WorkspaceType";
import { fetchWorkSpaceById } from "./fetchWorkspaceById";
import { fetchAllWorkspaceTypes } from "../../workspaceTypes/Utils/fetchAllWorkspaceTypes";

interface MyLoaderProps {
  workspaceId: string;
}

export interface FetchError {
    error: string;
  }

export interface ConsolidatedData {
    stages: Stage[] | FetchError;
    workspaceTypes: WorkspaceType[] | FetchError;
    workspace: Workspace | FetchError;
  }
  
  export const singleWorkspaceLoader = async ({params}: {params: MyLoaderProps}): Promise<ConsolidatedData | FetchError> => {
    const _id = params.workspaceId;
    console.log(`loading`)
    try {
      const stagesPromise = fetchAllStages();
      const workspaceTypesPromise = fetchAllWorkspaceTypes();
      const workspacePromise = fetchWorkSpaceById(_id);
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