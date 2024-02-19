import { Document } from "mongoose";
import { Order } from "./order.interface";




export interface UpdateOrderData extends Document {
    id: string,
    attr: Partial<Order>
   
}