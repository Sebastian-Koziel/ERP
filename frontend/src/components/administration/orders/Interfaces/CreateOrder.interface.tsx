import { Product } from "../../products/Interfaces/Product.interface"

export interface NewOrder extends Document {
    name: string
    comment: string
    orderNo: string
    products: [Product]
    
}