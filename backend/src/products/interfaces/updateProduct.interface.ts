import { Document } from "mongoose";
import { Product } from "./product.interface";




export interface UpdateProductData extends Document {
    id: string,
    attr: Partial<Product>
   
}