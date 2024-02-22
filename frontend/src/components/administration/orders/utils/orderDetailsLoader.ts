
import { Product } from "../../products/Interfaces/Product.interface";
import { fetchAllProducts } from "../../products/utils/fetchAllProducts";
import { Order } from "../Interfaces/Order.interface";
import { fetchOrderById } from "./fetchOrderById";

interface MyLoaderProps {
    orderId: string;
}

export interface FetchError {
    error: string;
  }

export interface editOrderConsolidatedData {
    products: Product[] | FetchError;
    order: Order | FetchError
    
  }
  
  export const editOrderLoader = async ({params}: {params: MyLoaderProps}): Promise<editOrderConsolidatedData | FetchError> => {
    const _id = params.orderId;

    try {
      const productsPromise = fetchAllProducts();
      const orderPromise = fetchOrderById(_id);
      
      
      // Add more resource URLs as needed
  
      const [products, order] = await Promise.all([productsPromise, orderPromise]);
      
      // Consolidate the data
      const consolidatedData: editOrderConsolidatedData = {
        products,
        order
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