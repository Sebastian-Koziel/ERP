import { storageGetToken } from "../../../../utils/localhostHandlers";
import { CreateOrderData } from "../Interfaces/CreateOrder.interface";


export async function addNewOrderFetcher(data:CreateOrderData) {

    const token = storageGetToken();
    const response = await fetch("http://localhost:3000/orders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with creating this order';
    throw new Error(errorMessage);
  }

}