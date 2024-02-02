import { User } from "../Interfaces/user.interface";

interface FetchError {
  error: string;
}

export const fetchUserById = async (userId: string): Promise<User | FetchError> => {
    const token = localStorage.getItem("token");
    try{
    const response = await fetch("http://localhost:3000/auth/" + userId, {
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