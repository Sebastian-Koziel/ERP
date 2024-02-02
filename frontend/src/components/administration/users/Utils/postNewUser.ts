import { CreateUser } from "../Interfaces/createUser.interface";

export async function postNewUser(data:any) {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/auth/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    throw { message: 'Could not add new product', status: 500}
  }

  const resData: string = await response.json();
  return resData;
}



    

  