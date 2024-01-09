import { NewOrder } from "../Interfaces/CreateOrder.interface";

export async function addNewOrderFetch(order:NewOrder) {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/orders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(order),
  });

  if(!response.ok) {
    throw { message: 'Could not add new order', status: 500}
  }

}

