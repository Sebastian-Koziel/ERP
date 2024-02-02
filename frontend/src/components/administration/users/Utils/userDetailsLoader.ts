
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
    
    
  }
  
  export const editUserLoader = async ({params}: {params: MyLoaderProps}): Promise<editUserConsolidatedData | FetchError> => {
    const _id = params.userId;

    try {
      const userPromise = fetchUserById(_id);
      
      
      
      // Add more resource URLs as needed
  
      const [user] = await Promise.all([userPromise]);
      
      // Consolidate the data
      const consolidatedData: editUserConsolidatedData = {
        user  
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