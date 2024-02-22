import { storageGetToken } from "../../../utils/localhostHandlers";
import { startJobData } from "../interfaces/startJobData.interface";

export async function updateOperationHandler(data: startJobData) {

    const token = storageGetToken();

    const response = await fetch("http://localhost:3000/operation-handlers/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with updating the operation handler';
    throw new Error(errorMessage);
  }

  return response.json();
}