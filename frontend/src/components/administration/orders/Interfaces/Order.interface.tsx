import { Product } from "../../products/Interfaces/Products.interface"

export interface Order extends Document {
    _id: string
    name: string
    orderNo: string
    products: [Product]
    
}