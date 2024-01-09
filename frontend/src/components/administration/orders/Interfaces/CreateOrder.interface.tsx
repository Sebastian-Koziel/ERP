import { Product } from "../../products/Interfaces/Products.interface"

export interface NewOrder extends Document {
    name: string
    comment: string
    orderNo: string
    products: [Product]
    
}