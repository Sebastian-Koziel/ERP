import { Document } from "mongoose";
import { Product } from "src/products/interfaces/product.interface";



export interface Order extends Document {
    _id: string
    name: string
    comment: string
    reqDeliveryDate: Date
    externalOrderNo: string
    products: [
        {productId: string
         qty: number }
    ]
    inProduction: boolean
    
}