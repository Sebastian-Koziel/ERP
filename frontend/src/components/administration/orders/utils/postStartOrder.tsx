import { storageGetToken } from "../../../../utils/localhostHandlers";
import { StartOrder } from "../Details/Interfaces/StartOrder.interface";

export async function startOrder(orderID:string) {

    const token = storageGetToken();

    const data: StartOrder = {
        order_id: orderID
    }

    const response = await fetch("http://localhost:3000/orders/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    throw { message: `Could not start an order ${orderID}`, status: 500}
  }

}