import { storageGetToken } from "../../../../utils/localhostHandlers";

export async function deleteOperation(operationId: string): Promise<void> {
  const token = storageGetToken();

  const response = await fetch(`http://localhost:3000/operations/` +operationId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with deleting the product';
    throw new Error(errorMessage);
  }
}
