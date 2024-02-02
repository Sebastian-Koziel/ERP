import { User } from "../Interfaces/user.interface";

export const fetchAllUsers = async (): Promise<User[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/auth", {
      headers: {
        Authorization: "Bearer "+token
      }
    });
    const data = await response.json();
    return data;
  };