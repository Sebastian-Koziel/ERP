import { storageGetToken } from "../../../utils/localhostHandlers";


export async function postOperationDone(operationHandlerId:string, qty: number) {

    const data = {
        qty: qty,
        operationHandler_id: operationHandlerId
    }

    const token = storageGetToken();

    const response = await fetch("http://localhost:3000/operation-handlers/jobdone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    throw { message: 'Could not add new product', status: 500}
  }
}