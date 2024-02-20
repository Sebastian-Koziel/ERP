
import { Stage } from "../../productionStages/interfaces/Stage.interface";
import { fetchAllStages } from "../../productionStages/utils/fetchAllStages";
import { User } from "../Interfaces/user.interface";
import { fetchUserById } from "./fetchUserByID";

interface MyLoaderProps {
    userId: string;
}

interface FetchError {
    error: string;
  }

export interface editUserConsolidatedData {
    user: User | FetchError;
    stages: Stage[] | FetchError
    
    
  }
  
  export const editUserLoader = async ({params}: {params: MyLoaderProps}): Promise<editUserConsolidatedData | FetchError> => {
    const _id = params.userId;

    try {
      const userPromise = fetchUserById(_id);
      const stagesPromise = fetchAllStages();
      
      
      // Add more resource URLs as needed
  
      const [user, stages] = await Promise.all([userPromise, stagesPromise]);
      
      // Consolidate the data
      const consolidatedData: editUserConsolidatedData = {
        user,  
        stages
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