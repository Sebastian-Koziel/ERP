
import { Product } from "../../products/Interfaces/Product.interface";
import { fetchAllProducts } from "../../products/utils/fetchAllProducts";


interface MyLoaderProps {
  workspaceId: string;
}

export interface FetchError {
    error: string;
  }

export interface newOrderConsolidatedData {
    products: Product[] | FetchError;
    
  }
  
  export const newOrderLoader = async ({params}: {params: MyLoaderProps}): Promise<newOrderConsolidatedData | FetchError> => {
    
    try {
      const productsPromise = fetchAllProducts();
      
      
      // Add more resource URLs as needed
  
      const [products] = await Promise.all([productsPromise]);
      
      // Consolidate the data
      const consolidatedData: newOrderConsolidatedData = {
        products
        
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