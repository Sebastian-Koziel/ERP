import { storageGetToken } from "../../../../utils/localhostHandlers";

export async function deleteStage(stageId: string): Promise<void> {
  const token = storageGetToken();

  const response = await fetch(`http://localhost:3000/stages/` +stageId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with deleting the stage';
    throw new Error(errorMessage);
  }
}
