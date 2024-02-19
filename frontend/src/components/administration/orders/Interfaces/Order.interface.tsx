import { ProductForOrder } from "./ProductForOrder.interface"

export interface Order {
    _id: string
    name: string
    comment: string
    externalOrderNo: string
    reqDeliveryDate: Date
    products: ProductForOrder[]
    inProduction: boolean
    
}