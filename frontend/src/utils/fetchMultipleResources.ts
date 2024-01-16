import { ResourceMap } from './ResourceTypes'; // Import your resource types
import { apiResources } from './apiResources';
import { storageGetToken } from './localhostHandlers';

export async function fetchMultipleResources<K extends keyof ResourceMap>(
  keys: K[]
): Promise<{ [P in K]: ResourceMap[P] | { error: string } }> {
  const results: Partial<{ [P in K]: ResourceMap[P] | { error: string } }> = {};

  for (const key of keys) {
    try {
      const data = await fetchResource(key);
      results[key] = data;
    } catch (error) {
        
            results[key] = { error: (error as Error).message || 'An error occurred' };
        
    }
  }

  return results as { [P in K]: ResourceMap[P] | { error: string } };
}

async function fetchResource<K extends keyof ResourceMap>(key: K): Promise<ResourceMap[K]> {
    const { path, error: errorMessage } = apiResources[key];
    const token = storageGetToken(); // Retrieve your auth token
  
    try {
      const response = await fetch(path, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || errorMessage);
      }
  
      return await response.json() as ResourceMap[K];
    } catch (error) {
        
            throw new Error((error as Error).message || 'An error occurred');
        
    }
  }

  type DataWithErrors = Record<string, { error: string }> | {};

  export function checkForErrors(data: DataWithErrors): string[] {
    const errors: string[] = [];
  
    for (const [key, value] of Object.entries(data)) {
      // Check if the current property has an 'error' property
      if (isObjectWithErrorMessage(value)) {
        errors.push(value.error);
      }
    }
  
    return errors;
  }

  function isObjectWithErrorMessage(obj: any): obj is { error: string } {
    return obj && typeof obj === 'object' && 'error' in obj;
  }