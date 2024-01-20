import { storageGetToken } from "../../../../utils/localhostHandlers";


export async function addNewWorkspace(data:any) {

    const token = storageGetToken();
    const response = await fetch("http://localhost:3000/workspaces/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with creating this workspace';
    throw new Error(errorMessage);
  }

  return response.json();
}