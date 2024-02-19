
import { ProductForOrder } from "./ProductForOrder.interface"

export interface CreateOrderData {
    name: string
    comment: string
    externalOrderNo: string
    reqDeliveryDate: Date | null
    products: ProductForOrder[]
    
}