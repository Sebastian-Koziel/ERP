import { storageGetToken } from "../../../utils/localhostHandlers";
import { finishJobData } from "../interfaces/finishJobData.interface";

export async function finishOperationHandlerPost(data: finishJobData) {

    const token = storageGetToken();

    const response = await fetch("http://localhost:3000/operation-handlers/finish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with finishing the operation handler';
    throw new Error(errorMessage);
  }

  return response.json();
}