import { Product } from "../../products/Interfaces/Product.interface"

export interface CreateOrderData {
    name: string
    comment: string
    externalOrderNo: string
    reqDeliveryDate: string
    products: string[]
    
}