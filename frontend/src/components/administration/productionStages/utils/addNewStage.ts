import { storageGetToken } from "../../../../utils/localhostHandlers";


export async function addNewStage(data:any) {

    const token = storageGetToken();
    const response = await fetch("http://localhost:3000/stages/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with creating this stage';
    throw new Error(errorMessage);
  }

  return response.json();
}