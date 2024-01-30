import { storageGetToken } from "../../../../utils/localhostHandlers";
import { CreateOperation } from "../Interfaces/CreateOperation.interface";


export async function addNewOperationFetcher(data:CreateOperation) {

    const token = storageGetToken();
    const response = await fetch("http://localhost:3000/operations/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with creating this operartion';
    throw new Error(errorMessage);
  }

}