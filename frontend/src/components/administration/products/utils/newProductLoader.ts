
import { fetchAllStages } from "../../productionStages/utils/fetchAllStages";
import { fetchAllWorkspaceTypes } from "../../workspaceTypes/Utils/fetchAllWorkspaceTypes";
import { Product } from "../Interfaces/Products.interface";
import { Operation } from "../../operations/Interfaces/Operations.interface";
import { fetchAllOperations } from "../../operations/Utils/fetchAllOperations";
import { fetchAllProducts } from "./fetchAllProducts";

interface MyLoaderProps {
  workspaceId: string;
}

export interface FetchError {
    error: string;
  }

export interface newProductConsolidatedData {
    operations: Operation[] | FetchError;
    products: Product[] | FetchError;
  }
  
  export const newProductLoader = async ({params}: {params: MyLoaderProps}): Promise<newProductConsolidatedData | FetchError> => {
    
    try {
      const operationsPromise = fetchAllOperations();
      const productsPromise = fetchAllProducts();
      
      // Add more resource URLs as needed
  
      const [operations, products] = await Promise.all([operationsPromise, productsPromise]);
      
      // Consolidate the data
      const consolidatedData: newProductConsolidatedData = {
        operations,
        products,
      };
  
      return consolidatedData;
    } catch (error) {
      // Handle network and other errors
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "An unexpected error occurred" };
    }
  };