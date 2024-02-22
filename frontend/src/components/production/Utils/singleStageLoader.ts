import { OperationHandler } from "../../administration/Production/Interfaces/operationHandler.interface";
import { Order } from "../../administration/orders/Interfaces/Order.interface";
import { fetchAllOrders } from "../../administration/orders/utils/fetchAllOrders";
import { fetchOperationHandlersByStage } from "./fetchOperationHandlersByStage";

export interface FetchError {
    error: string;
  }

export interface SingleStageData {
    operationHandlers: OperationHandler[] | FetchError
    orders: Order[] | FetchError
  }
  
  export const singleStageLoader = async (_id:string): Promise<SingleStageData | FetchError> => {

    try {
      const operationHandlersPromise = fetchOperationHandlersByStage(_id);
      const ordersPromise = fetchAllOrders();

      const [operationHandlers, orders] = await Promise.all([operationHandlersPromise, ordersPromise]);
      
      // Consolidate the data
      const consolidatedData: SingleStageData = {
        operationHandlers,  
        orders
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