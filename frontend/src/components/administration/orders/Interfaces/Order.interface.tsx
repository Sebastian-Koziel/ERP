import { Product } from "../../products/Interfaces/Product.interface"

export interface Order extends Document {
    _id: string
    name: string
    orderNo: string
    products: [Product]
    
}