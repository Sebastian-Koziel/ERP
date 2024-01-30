import { storageGetToken } from "../../../../utils/localhostHandlers";

export async function updateProduct(data:any) {

    const token = storageGetToken();

    const response = await fetch("http://localhost:3000/products/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with updating the product';
    throw new Error(errorMessage);
  }

  return response.json();
}