import { Document } from "mongoose";
import { Product } from "src/products/interfaces/product.interface";


export interface Order extends Document {
    name: string
    orderNo: string
    products: [Product]
    
}