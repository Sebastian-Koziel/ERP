import { Stage } from "../../productionStages/interfaces/Stage.interface";
import { fetchAllStages } from "../../productionStages/utils/fetchAllStages";
import { WorkspaceType } from "../../workspaceTypes/Interfaces/WorkspaceType";
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
  }
  
  export const addNewWorkspaceLoader = async ({params}: {params: MyLoaderProps}): Promise<ConsolidatedData | FetchError> => {
    const _id = params.workspaceId;
    console.log(`loading`)
    try {
      const stagesPromise = fetchAllStages();
      const workspaceTypesPromise = fetchAllWorkspaceTypes();
      // Add more resource URLs as needed
  
      const [stages, workspaceTypes] = await Promise.all([stagesPromise, workspaceTypesPromise ]);
      
      // Consolidate the data as needed
      const consolidatedData: ConsolidatedData = {
        stages,
        workspaceTypes,
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