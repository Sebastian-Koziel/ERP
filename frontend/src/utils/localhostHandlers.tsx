import { User } from "../components/administration/users/Interfaces/user.interface";


export const storageGetUser = () => {
    const userString = localStorage.getItem("user");
    const user:User = userString ? JSON.parse(userString) : null

    return user;
  }

  export const storageGetToken = () => {
    const token = localStorage.getItem("token");
    return token;
  }
