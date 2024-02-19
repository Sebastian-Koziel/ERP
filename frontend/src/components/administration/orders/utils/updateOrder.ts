import { storageGetToken } from "../../../../utils/localhostHandlers";
import { UpdateOrderData } from "../Interfaces/UpdateOrder.interface";


export async function updateOrder(data:UpdateOrderData) {

    const token = storageGetToken();

    const response = await fetch("http://localhost:3000/orders/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with updating the order';
    throw new Error(errorMessage);
  }

  return response.json();
}