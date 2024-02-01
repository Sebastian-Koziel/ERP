import { storageGetToken } from "../../../../utils/localhostHandlers";
import { StartOrder } from "../Interfaces/StartOrder.interface";


export async function startOrder(data: StartOrder) {

    const token = storageGetToken();

    const response = await fetch("http://localhost:3000/orders/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with starting this order';
    throw new Error(errorMessage);
  }

}