import { User } from "../Interfaces/user.interface";

export const fetchUserById = async (userId: string): Promise<User> => {
    const token = localStorage.getItem("token");
    
    const response = await fetch("http://localhost:3000/auth/" + userId, {
      headers: {
        Authorization: "Bearer "+token
      }
    });
    
    if(!response.ok) {
        throw { message: `Something went wrong with fetchin user ${userId}`, status: 500}
      }

    const data = await response.json();
  
  
    return data;
  };