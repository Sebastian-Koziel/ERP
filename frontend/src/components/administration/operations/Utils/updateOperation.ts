import { storageGetToken } from "../../../../utils/localhostHandlers";
import { UpdateoperationData } from "../Interfaces/UpdateOperation.interface";

export async function updateOperation(data:UpdateoperationData) {

    const token = storageGetToken();

    const response = await fetch("http://localhost:3000/operations/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with updating the operation';
    throw new Error(errorMessage);
  }

  return response.json();
}