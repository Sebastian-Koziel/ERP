
import { Product } from "../Interfaces/Product.interface";
import { Operation } from "../../operations/Interfaces/Operations.interface";
import { fetchAllOperations } from "../../operations/Utils/fetchAllOperations";
import { fetchAllProducts } from "./fetchAllProducts";
import { fetchProductById } from "./fetchProductById";

interface MyLoaderProps {
  product_id: string;
}

export interface FetchError {
    error: string;
  }

export interface editProductConsolidatedData {
    operations: Operation[] | FetchError;
    products: Product[] | FetchError;
    product: Product | FetchError;
  }
  
  export const editProductLoader = async ({params}: {params: MyLoaderProps}): Promise<editProductConsolidatedData | FetchError> => {
    const _id = params.product_id;
    try {
      const operationsPromise = fetchAllOperations();
      const productsPromise = fetchAllProducts();
      const productPromise = fetchProductById(_id);
      
      // Add more resource URLs as needed
  
      const [operations, products, product] = await Promise.all([operationsPromise, productsPromise, productPromise]);
      
      // Consolidate the data
      const consolidatedData: editProductConsolidatedData = {
        operations,
        products,
        product
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