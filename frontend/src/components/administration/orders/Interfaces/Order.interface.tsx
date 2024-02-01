import { ProductForOrder } from "./ProductForOrder"

export interface Order {
    _id: string
    name: string
    comment: string
    externalOrderNo: string
    reqDeliveryDate: Date
    products: ProductForOrder[]
    
}